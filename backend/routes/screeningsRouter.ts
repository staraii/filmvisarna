import express from "express";
import ScreeningsController from "../controller/screeningsController.js";
import acl from "../middleware/acl.js";
const router = express.Router();

router.get("/api/screenings/", acl, ScreeningsController.handleGetScreenings);
router.get("/api/screenings/all", acl, ScreeningsController.getAllScreenings);
router.get("/api/screenings/:screeningId", acl, ScreeningsController.handleGetScreeningById);
router.get("/api/screenings/:title", acl, ScreeningsController.handleGetScreeningsByTitle);
// router.get(
//   "/booking/:bookingNumber",
//   ScreeningsController.handleGetBookingsByBookingNumber
// );
router.post("/api/screenings/", acl, ScreeningsController.handleCreateScreening);
router.put("/api/screenings/:id", acl, ScreeningsController.handleUpdateScreening);
router.delete("/api/screenings/:screeningId", acl, ScreeningsController.handleDeleteScreening);

export default router;
