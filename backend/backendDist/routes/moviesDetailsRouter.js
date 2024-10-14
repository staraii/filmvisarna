import express from "express";
import moviesDetailsController from "../controller/moviesDetailsController.js";
const router = express.Router();
router.get("/api/moviesDetails/:movieId", moviesDetailsController.getMovieDetails);
export default router;
//# sourceMappingURL=moviesDetailsRouter.js.map