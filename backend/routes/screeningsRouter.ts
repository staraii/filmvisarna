import express from "express";
import ScreeningsController from "../controller/screeningsController.js";

const router = express.Router();

router.get("/", ScreeningsController.handleGetScreenings);
router.get("/all", ScreeningsController.getAllScreenings);
router.get("/:screeningId", ScreeningsController.handleGetScreeningById);
router.get("/:title", ScreeningsController.handleGetScreeningsByTitle);
router.get(
  "/booking/:bookingNumber",
  ScreeningsController.handleGetBookingsByBookingNumber
);
router.post("/", ScreeningsController.handleCreateScreening);
router.put("/:id", ScreeningsController.handleUpdateScreening);
router.delete("/:screeningId", ScreeningsController.handleDeleteScreening);

export default router;
