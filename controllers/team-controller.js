import { updateTeamRecord } from "../helpers/update-team-record"

export const checkTeamRecord = (req, res) => {
    updateTeamRecord()

    return res.status(200).json({
        success: true,
        data: {
            status: "Cron triggered successfully!!"
        }
    });
}
