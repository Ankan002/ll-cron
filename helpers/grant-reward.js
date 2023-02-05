const User = require("../models/User");
const CareerReward = require("../models/CareerReward");
const { format, differenceInHours, parse, subDays } = require("date-fns");
const { getDailyRewardLevel } = require("./get-daily-reward");

const convertToMaxHeap = (referredUsersPackageAmounts) => {
  let currentIndex = Math.floor((referredUsersPackageAmounts.length - 1) / 2);

  while (currentIndex >= 0) {
    maxHeapify(
      referredUsersPackageAmounts,
      currentIndex,
      referredUsersPackageAmounts.length - 1
    );
    currentIndex--;
  }
};

const heapPop = (referredUsersPackageAmounts) => {
  if (referredUsersPackageAmounts.length < 1) return 0;
  if (referredUsersPackageAmounts.length === 1)
    return referredUsersPackageAmounts.pop();

  [
    referredUsersPackageAmounts[0],
    referredUsersPackageAmounts[referredUsersPackageAmounts.length - 1],
  ] = [
    referredUsersPackageAmounts[referredUsersPackageAmounts.length - 1],
    referredUsersPackageAmounts[0],
  ];

  const maxValue = referredUsersPackageAmounts.pop();

  maxHeapify(
    referredUsersPackageAmounts,
    0,
    referredUsersPackageAmounts.length - 1
  );

  return maxValue;
};

const maxHeapify = (referredUsersPackageAmounts, parentIndex, maxLength) => {
  if (parentIndex > maxLength || parentIndex < 0) return;

  let leftChildIndex = parentIndex * 2 + 1;
  let rightChildIndex = parentIndex * 2 + 2;
  let maxIndex = parentIndex;

  if (
    leftChildIndex <= maxLength &&
    referredUsersPackageAmounts[leftChildIndex] >
      referredUsersPackageAmounts[maxIndex]
  )
    maxIndex = leftChildIndex;

  if (
    rightChildIndex <= maxLength &&
    referredUsersPackageAmounts[rightChildIndex] >
      referredUsersPackageAmounts[maxIndex]
  )
    maxIndex = rightChildIndex;

  if (maxIndex !== parentIndex) {
    [
      referredUsersPackageAmounts[parentIndex],
      referredUsersPackageAmounts[maxIndex],
    ] = [
      referredUsersPackageAmounts[maxIndex],
      referredUsersPackageAmounts[parentIndex],
    ];

    maxHeapify(referredUsersPackageAmounts, maxIndex, maxLength);
  }
};

const calculateRewards = async (userId, rewardCache) => {
  if (rewardCache[userId] !== undefined) return rewardCache[userId];

  const userRetrieved = await User.findById(userId);

  const childUsers = await User.find({
    UpperLineSponserUser: userRetrieved.WalletAddress,
  }).select("id");

  if (childUsers.length < 0) {
    rewardCache[userId] = {
      rewardAmount: 0,
      bestChildrenIncomes: [0],
      myAmount: Number(userRetrieved.PackageAmount)
        ? Number(userRetrieved.PackageAmount)
        : 0,
    };

    return rewardCache[userId];
  }

  let myBestChildrenIncomes = [];

  for (let childUser of childUsers) {
    const currentChildrenIncomes = await calculateRewards(
      childUser.id,
      rewardCache
    );

    myBestChildrenIncomes = [
      ...myBestChildrenIncomes,
      ...currentChildrenIncomes.bestChildrenIncomes,
      currentChildrenIncomes.myAmount,
    ];
  }

  convertToMaxHeap(myBestChildrenIncomes);

  const bestAmount = heapPop(myBestChildrenIncomes);
  const secondBestAmount = heapPop(myBestChildrenIncomes);
  const thirdBestAmount = heapPop(myBestChildrenIncomes);

  const rewardAmount =
    bestAmount * (40 / 100) +
    secondBestAmount * (30 / 100) +
    thirdBestAmount * (30 / 100);

  rewardCache[userId] = {
    rewardAmount: rewardAmount,
    bestChildrenIncomes: [bestAmount, secondBestAmount, thirdBestAmount],
    myAmount: Number(userRetrieved.PackageAmount)
      ? Number(userRetrieved.PackageAmount)
      : 0,
  };

  return rewardCache[userId];
};

exports.grantReward = async () => {
  const rewardCache = {};

  const allUsersIds = await User.find({}).select("id");

  for (let retrievedUser of allUsersIds) {
    const rewards = await CareerReward.find({
      user_id: retrievedUser.id,
    })
      .sort("-createdAt")
      .limit(1);

    if (rewards.length > 0) {
      const lastRewardTimeString = rewards[0].time_granted;
      const lastRewardTime = parse(
        lastRewardTimeString,
        "dd MM yyyy HH:mm",
        new Date()
      );

      const currentDate = new Date();

      const hourDifference = differenceInHours(currentDate, lastRewardTime);

      const totalDaysToBeGranted = hourDifference % 24;

      if (totalDaysToBeGranted <= 0) continue;

      const eachDayRewardToBeGranted = await calculateRewards(
        retrievedUser.id,
        rewardCache
      );
      const dailyReward = getDailyRewardLevel(
        eachDayRewardToBeGranted.rewardAmount
      );

      for (let i = 0; i < totalDaysToBeGranted; i++) {
        const date = subDays(new Date(), i);
        const dateString = format(date, "dd MM yyyy HH:mm");

        await CareerReward.create({
          user_id: retrievedUser.id,
          reward_level: dailyReward.level,
          reward_granted: dailyReward.reward,
          time_granted: dateString,
        });
      }
    } else {
      const eachDayRewardToBeGranted = await calculateRewards(
        retrievedUser.id,
        rewardCache
      );
      const dailyReward = getDailyRewardLevel(
        eachDayRewardToBeGranted.rewardAmount
      );

      const dateString = format(new Date(), "dd MM yyyy HH:mm");

      await CareerReward.create({
        user_id: retrievedUser.id,
        reward_level: dailyReward.level,
        reward_granted: dailyReward.reward,
        time_granted: dateString,
      });
    }
  }

  console.log("DONE!!");
};
