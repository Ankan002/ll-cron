const { grantReward } = require("../helpers/grant-reward")

exports.careerRewardController = (req, res) => {
    grantReward();

    return res.status(200).json({
        success: true,
        data: {
            status: "Reward Cron triggered successfully!!"
        }
    })
}