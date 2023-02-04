"user strict"

const User = require("../models/User");
const TeamRecord = require("../models/TeamRecord");
const DepositRecord = require("../models/DepositRecord");

exports.updateTeamRecord = async () => {
    const teamRecordCache = {};

    const allUsersIds = await User.find({}).select("id");

    for(let retrievedUser of allUsersIds) {
        const bussinessCalculatedResults = await updateTeamRecordHelper(retrievedUser.id, teamRecordCache);

        const myTeamRecordRetrieved = await TeamRecord.findOne({
            user: retrievedUser.id
        }).select("id");

        if(!myTeamRecordRetrieved){
            await TeamRecord.create({
                user: retrievedUser.id,
                totalBussiness: bussinessCalculatedResults.totalMemberBussiness,
                totalMembers: bussinessCalculatedResults.totalMembers
            });
        } else {
            await TeamRecord.findByIdAndUpdate(myTeamRecordRetrieved.id, {
                $set: {
                    totalBussiness: bussinessCalculatedResults.totalMemberBussiness,
                    totalMembers: bussinessCalculatedResults.totalMembers
                }
            }, {new: true});
        }
    }

    console.log("DONE!!");
}

const updateTeamRecordHelper = async (userId, teamRecordCache) => {
    if(teamRecordCache[userId] !== undefined) return teamRecordCache[userId];

    const userRetrieved = await User.findById(userId);

    const childUsers = await User.find({
        UpperLineSponserUser: userRetrieved.WalletAddress
    }).select("id");

    const myInvestmentsRecords = await DepositRecord.find({
        RecordOwner: userId
    }).select("DepositAmount");

    let myInvestment = 0;

    for(let myInvestmentsRecord of myInvestmentsRecords) {
        if(myInvestmentsRecord.DepositAmount !== "null") {
            myInvestment += Number(myInvestmentsRecord.DepositAmount);
        }
    }

    if(childUsers.length <= 0) {
        teamRecordCache["userId"] = {
            totalMembers: 0,
            totalMemberBussiness: 0,
            myCount: 1,
            myInvestment
        };

        return {
            totalMembers: 0,
            totalMemberBussiness: 0,
            myCount: 1,
            myInvestment
        };
    }

    let totalMembers = 0;
    let totalBussiness = 0;

    for(let childUser of childUsers){
        const foundRecords = await updateTeamRecord(childUser.id, teamRecordCache);

        totalMembers += foundRecords.totalMembers + foundRecords.myCount;
        totalBussiness += foundRecords.totalMemberBussiness + foundRecords.myInvestment;
    }

    teamRecordCache[userId] = {
        totalMembers,
        totalBussiness,
        myCount: 1,
        myInvestment
    }

    return {
        totalMembers,
        totalBussiness,
        myCount: 1,
        myInvestment
    };
};
