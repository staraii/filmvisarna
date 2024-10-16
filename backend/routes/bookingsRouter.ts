import express from "express";
import bookingsController from "../controller/bookingsController.js";

const router = express.Router();


router
  .get("/:table", bookingsController.handleGetBookings)
  .post("/:userId?", bookingsController.createNewBooking)
  .put("/:bookingNumber/isPayed/:status", bookingsController.updatePaymentStatus)
  .put("/:bookingNumber/isActive/:status", bookingsController.updateActiveStatus)
  .delete("/:bookingNumber/:email", bookingsController.deleteBooking)
//router.get("/bookings", bookingsController.getBookings);



export default router;
