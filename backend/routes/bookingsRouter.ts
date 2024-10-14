import express from "express";
import bookingsController from "../controller/bookingsController.js";

const router = express.Router();

router.get("/bookings", bookingsController.getBookings);


export default router;
