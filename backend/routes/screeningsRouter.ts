import express from "express";
import screeningsController from "../controller/screeningsController.js";

const router = express.Router();

router.get("/screenings", screeningsController.getScreenings);



export default router;