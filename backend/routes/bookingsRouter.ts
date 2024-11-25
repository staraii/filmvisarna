import express from "express";
import bookingsController from "../controller/bookingsController.js";
//import { aclAuth } from "../middleware/aclAuth.js";
import acl from "../middleware/acl.js";
const router = express.Router();

router
  .get("/api/bookings/:table", acl, bookingsController.handleGetBookings)
  .post("/api/bookings/", acl, bookingsController.createNewBooking)
  .put("/api/bookings/:table", acl, bookingsController.updateBooking)
  .delete("/api/bookings/", acl, bookingsController.deleteBooking)

export default router;
