import express from "express";
import moviesDetailsController from "../controller/moviesDetailsController.js";

const router = express.Router();

router.get("/:movieId", moviesDetailsController.getMovieDetails);

export default router;