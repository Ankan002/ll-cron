const mongoose = require("mongoose");

const CareerRewardSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reward_level: {
        type: String,
        required: true,
    },
    reward_granted: {
        type: String,
        required: true
    },
    time_granted: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("CareerReward", CareerRewardSchema);