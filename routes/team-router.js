import {Router} from "express";
import { checkTeamRecord } from "../controllers/team-controller";

export const teamRouter = Router();

teamRouter.post("/team-record", checkTeamRecord);
