import { db } from "../index.js";
import { Request, Response } from "express";

const moviesDetailsController = {
  
  async getMovieDetails(req:Request, res: Response): Promise<void> {
    const { movieId } = req.params;
    try {
      const [result] = await db.query("SELECT * FROM fullMovies WHERE id = ?", [movieId]);
      res.json({ success: result });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: "Unknown error occurred" });
      }
    }
  },
};

export default moviesDetailsController;