import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    return next(); // User is authenticated, proceed
  }
  return res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
};

