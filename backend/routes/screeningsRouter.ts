import express from "express";
import ScreeningsController from "../controller/screeningsController.js";

const router = express.Router();
const screeningsController = new ScreeningsController();

// Route for users to get their own screenings
router.get("/screenings", async (_req, res) => {
  try {
    const result = await screeningsController.getScreenings();
    res.json({ success: result });
  } catch (error) {
    console.error("Error fetching screenings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/screenings/:id", async (req, res) => {
  const result = await screeningsController.getScreeningsByUserId(
    Number(req.params.id)
  );
  if (result && result.length > 0) {
    res.json({ success: result });
  } else {
    return res.status(404).json({ message: "No screenings found" });
  }
});

router.post("/screenings", async (req, res) => {
  const reqBody = {
    movieId: req.body.movieId,
    theatreId: req.body.theatreId,
    dateTime: req.body.dateTime,
  };
  const result = await screeningsController.createScreening(reqBody);
  res.json({ success: result[0] });
});

router.put("/screenings/:id", async (req, res) => {
  const reqBody = {
    movieId: req.body.movieId,
    theatreId: req.body.theatreId,
    dateTime: req.body.dateTime,
  };
  const result = await screeningsController.updateScreening(
    reqBody,
    Number(req.params.id)
  );
  res.json({ success: result[0] });
});

router.delete("/screenings/:id", async (req, res) => {
  const result = await screeningsController.deleteScreening(
    Number(req.params.id)
  );
  res.json({ success: result[0] });
});

router.get("/screenings/search/:title", async (req, res) => {
  const result = await screeningsController.getScreeningsByTitle(
    req.params.title
  );
  res.json({ success: result[0] });
});

export default router;
