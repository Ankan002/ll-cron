const express = require("express");
const { careerRewardController } = require("../controllers/career-reward-controller");

const careerRewardRouter = express.Router();

careerRewardRouter.post("/calculate-career-reward", careerRewardController);

module.exports = careerRewardRouter;
