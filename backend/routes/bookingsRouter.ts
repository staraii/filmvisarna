import express from "express";
import BookingsController from "../controller/bookingsController.js";

const router = express.Router();
const bookingsController = new BookingsController();

router.post("/bookings/:id", async (req, res) => {
  let result = await bookingsController.handleMail(Number(req.params.id));
  res.json({ success: result });
});

export default router;
