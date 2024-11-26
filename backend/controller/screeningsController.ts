import { Request, Response } from "express";
import screeningsService from "../services/screeningsService.js";

const handleGetScreenings = async (_req: Request, res: Response) => {
  try {
    const result = await screeningsService.getScreenings();
    if (!result) {
      return res.status(500).json({ error: "Error getting screenings" });
    }
    return res.status(200).json({ success: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const handleCreateScreening = async (req: Request, res: Response) => {
  const reqBody = {
    movieId: req.body.movieId,
    theatreId: req.body.theatreId,
    dateTime: req.body.dateTime,
  };
  try {
    const result = await screeningsService.createScreening(reqBody);
    if (!result) {
      return res.status(500).json({ error: "Error creating screening" });
    }
    return res.status(201).json({ success: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const handleUpdateScreening = async (req: Request, res: Response) => {
  try {
    const reqBody = {
      movieId: req.body.movieId,
      theatreId: req.body.theatreId,
      dateTime: req.body.dateTime,
    };
    const result = await screeningsService.updateScreening(reqBody);
    if (!result) {
      return res.status(500).json({ error: "Error updating screening" });
    }
    return res.status(201).json({ success: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const handleDeleteScreening = async (req: Request, res: Response) => {
  const { screeningId } = req.params;
  try {
    const result = await screeningsService.deleteScreening(Number(screeningId));
    if (!result) {
      return res.status(500).json({ error: "Error deleting screening" });
    }
    return res.status(201).json({ success: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const handleGetScreeningById = async (req: Request, res: Response) => {
  const { screeningId } = req.params;
  try {
    const result = await screeningsService.getScreeningById(
      Number(screeningId)
    );
    if (!result) {
      return res.status(500).json({ error: "Error getting screening" });
    }
    return res.status(200).json({ success: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};

const handleGetScreeningsByTitle = async (req: Request, res: Response) => {
  const { title } = req.params;
  try {
    const result = await screeningsService.getScreeningByTitle(title);
    if (!result) {
      return res.status(500).json({ error: "Error getting screening" });
    }
    return res.status(201).json({ success: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
};
// const handleGetBookingsByBookingNumber = async (
//   req: Request,
//   res: Response
// ) => {
//   const { bookingNumber } = req.params;
//   try {
//     const result = await screeningsService.getBookingsByBookingNumber(
//       bookingNumber
//     );
//     if (!result) {
//       return res.status(500).json({ error: "Error getting booking" });
//     }
//     return res.status(200).json({ success: result });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server error");
//   }
// };

const getAllScreenings = async (_req: Request, res: Response) => {
  try {
    const result = await screeningsService.getAllScreenings();
    if (result) {
      return res.status(200).json(result)
    }
    res.status(404).json({message: "Not found"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Internal server error"})
  }
}
export default {
  handleGetScreenings,
  handleCreateScreening,
  handleUpdateScreening,
  handleDeleteScreening,
  handleGetScreeningById,
  handleGetScreeningsByTitle,
  //handleGetBookingsByBookingNumber,
  getAllScreenings,
};
