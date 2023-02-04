const { updateTeamRecord } = require("../helpers/update-team-record")

exports.checkTeamRecord = (req, res) => {
    updateTeamRecord()

    return res.status(200).json({
        success: true,
        data: {
            status: "Cron triggered successfully!!"
        }
    });
}
