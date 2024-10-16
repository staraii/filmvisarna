import express from "express";
import ScreeningsController from "../controller/screeningsController.js";
import { checkAcl } from "../middleware/checkAcl.js";

const router = express.Router();
const screeningsController = new ScreeningsController();

// Route for users to get their own screenings
router.get("/screenings", checkAcl, async (req, res) => {
  try {
    console.log("Request Headers:", req.headers); // Logging headers
    const result = await screeningsController.getScreenings(); // Fetch all screenings
    res.json({ success: result }); // Return all screenings
  } catch (error) {
    console.error("Error fetching screenings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for getting a screening by ID
router.get("/screenings/:id", checkAcl, async (req, res) => {
    const userId = Number(req.params.id); // Get user ID from URL
    const sessionUserId = req.session.userId; // Get logged-in user ID from session

    // Check if the user is trying to access their own screenings
    if (userId !== sessionUserId) {
        return res.status(403).json({ message: "Access denied: You can only access your own screenings." });
    }

    // Fetch screenings for the user
    const result = await screeningsController.getScreeningsByUserId(userId);
    
    // Check if any screenings were found
    if (result && result.length > 0) {
        res.json({ success: result });
    } else {
        return res.status(404).json({ message: "No screenings found for this user." });
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
