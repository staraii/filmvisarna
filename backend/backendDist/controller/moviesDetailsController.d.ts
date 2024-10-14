import { Request, Response } from "express";
declare const moviesDetailsController: {
    getMovieDetails(req: Request, res: Response): Promise<void>;
};
export default moviesDetailsController;
