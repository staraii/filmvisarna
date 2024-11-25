import express from "express";
import moviesDetailsController from "../controller/moviesDetailsController.js";
import acl from "../middleware/acl.js";
const router = express.Router();

router.get("/api/moviesDetails/:movieId", acl, moviesDetailsController.getMovieDetails);

export default router;