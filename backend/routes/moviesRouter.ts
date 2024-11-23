import express from "express";
import moviesController from "../controller/moviesController.js";

const router = express.Router();

router.post("/api/movies", moviesController.postNewMovie);


export default router;
