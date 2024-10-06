import { Router } from "express";
import {Get_All_Match_History, Set_Match_History} from "../controllers/history.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-match-history").get(verifyJWT, Get_All_Match_History);
router.route("/set-match-history").post(verifyJWT, Set_Match_History);

export default router; 