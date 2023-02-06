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

exports.getDailyRewardLevel = (tier) => level[tier];

exports.levelEligibleFor = (bestIncome, secondBestIncome, thirdBestIncome) => {
  const partialBest = bestIncome * (40 / 100);
  const partialSecondBest = secondBestIncome * (30 / 100);
  const partialThirdBest = thirdBestIncome * (30 / 100);

  console.log(partialBest, partialSecondBest, partialThirdBest);

  if(partialBest >= 4 && partialSecondBest >=3 && partialThirdBest >= 3) {

    if(partialBest >= 4.8 && partialSecondBest >= 3.6 && partialThirdBest >= 3.6) {

      if(partialBest >= 10000 && partialSecondBest >= 7500 && partialThirdBest >= 7500){

        if(partialBest >= 40000 && partialSecondBest >= 30000 && partialThirdBest >= 30000) {

          if(partialBest >= 100000 && partialSecondBest >= 75000 && partialThirdBest >= 75000) {

            if(partialBest >= 200000 && partialSecondBest >= 150000 && partialThirdBest >= 150000){

              if(partialBest >= 400000 && partialSecondBest >= 300000 && partialThirdBest >= 300000) {

                if(partialBest >= 600000 && partialSecondBest >= 450000 && partialThirdBest >= 450000) {

                  if(partialBest >= 1000000 && partialSecondBest >= 750000 && partialThirdBest >= 750000){
                    return "President";
                  }

                  else return "Director";

                }

                else return "Senate";
              }

              else return "Expert";
            }

            else return "Professional";
          }

          else return "Pro Starter";
        }

        else return "Starter";
      }

      else return "Pro";
    }

    else return "Junior";
  }

  else return "InEligible";
}
