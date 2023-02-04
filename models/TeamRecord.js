const mongoose = require("mongoose");

const TeamRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    totalMembers: {
        type: Number,
        required: true,
    },
    totalBussiness: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("TeamRecord", TeamRecordSchema);
