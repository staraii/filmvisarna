// defines middleware function, Checks whether a user is logged in by verifying if the userId exists in the session 
// protect certain routes, ensuring that only authenticated users can access specific resources

import { Request, Response, NextFunction } from "express";

// Middleware to check if user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {// Check if user ID is stored in the session
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  return res.status(401).json({ message: "Unauthorized" }); // If no user ID, return 401 Unauthorized
};

