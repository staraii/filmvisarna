import { db } from "../index.js";
import { Request, Response } from "express";

const moviesDetailsController = {
  
  async getMovieDetails(req:Request, res: Response): Promise<void> {
    const { movieId } = req.params;
    try {
      const [movieResult] = await db.execute("SELECT * FROM fullMovies WHERE id = ?", [movieId]);
      const [screeningsResult] = await db.execute("SELECT * FROM screenings WHERE movieid = ?", [movieId]);

      res.json({
        success: true,
        movie: movieResult,
        screenings: screeningsResult,
      });

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