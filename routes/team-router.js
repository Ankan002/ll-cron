const express = require("express");
const { checkTeamRecord } = require("../controllers/team-controller");

const teamRouter = express.Router();

teamRouter.post("/team-record", checkTeamRecord);

module.exports = teamRouter;
