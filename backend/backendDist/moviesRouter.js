import express from "express";
import moviesController from "../controller/moviesController.js";
const router = express.Router();
router.get("/movies", moviesController.getMovies);
export default router;
//# sourceMappingURL=moviesRouter.js.map