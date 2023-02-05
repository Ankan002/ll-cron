const level = {
  InEligible: "Not Eligible",
  Junior: "$0.5",
  Pro: "Domestic Tour",
  Starter: "Laptop",
  "Pro Starter": "$25",
  Professional: "$100",
  Expert: "$200",
  Senate: "$300",
  Director: "$500",
  President: "$1000",
};

exports.getDailyRewardLevel = (amount) => {
  if (amount >= 2500)
    return {
      level: "Junior",
      reward: level.Junior,
    };
  else if (amount >= 7500)
    return {
      level: "Pro",
      reward: level.Pro,
    };
  else if (amount >= 25000)
    return {
      level: "Starter",
      reward: level.Starter,
    };
  else if (amount >= 100000)
    return {
      level: "Pro Starter",
      reward: level["Pro Starter"],
    };
  else if (amount >= 250000)
    return {
      level: "Professional",
      reward: level.Professional,
    };
  else if (amount >= 500000)
    return {
      level: "Expert",
      reward: level.Expert,
    };
  else if (amount >= 1000000)
    return {
      level: "Senate",
      reward: level.Senate,
    };
  else if (amount >= 1500000)
    return {
      level: "Director",
      reward: level.Director,
    };
  else if (amount >= 2500000)
    return {
      level: "President",
      reward: level.President,
    };
  else
    return {
      level: "Ineligible",
      reward: level.InEligible,
    };
};
