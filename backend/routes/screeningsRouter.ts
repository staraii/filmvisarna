import express from "express";
import ScreeningsController from "../controller/screeningsController.js";

const router = express.Router();
const screeningsController = new ScreeningsController();

router.get("/screenings", async (_req, res) => {
  let result = await screeningsController.getScreenings();
  res.json({ success: result[0] });
});

export default router;
