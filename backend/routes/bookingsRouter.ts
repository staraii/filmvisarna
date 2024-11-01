import express from "express";
import bookingsController from "../controller/bookingsController.js";
import { aclAuth } from "../middleware/aclAuth.js";

const router = express.Router();


router
  .get("/:table", aclAuth, bookingsController.handleGetBookings)
  .post("/", aclAuth, bookingsController.createNewBooking)
  .put("/:table", aclAuth, bookingsController.updateBooking)
  .delete("/:table", aclAuth, bookingsController.deleteBooking)

export default router;
