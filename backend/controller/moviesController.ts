import { Request, Response } from "express";
import movieService from "../services/movieService.js";
import { MovieBody} from "../types/movieTypes.js"

const reviewsRegExes: { [key: string]: RegExp } = {
  rating: /^[1-5]$/,
  reviewBy: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
  review: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
};

const movieRegExes: { [key: string]: RegExp } = {
  title: /^[a-zA-ZåäöÅÄÖ0-9.,&!\-" ]+$/,
  ageRating: /^(?:1|7|11|15)$/,
  duration: /^[1-9][0-9]*$/,
  releaseYear: /^19[0-9][0-9]$/,
  spokenLanguage: /^[a-zA-ZåäöÅÄÖ]{2,3}$/,
  subtitles: /^[a-zA-ZåäöÅÄÖ]{2,3}$/,
  cast: /^[a-zA-ZåäöÅÄÖ0-9.,\- ]+$/,
  directedBy: /^[a-zA-ZåäöÅÄÖ0-9.,\- ]+$/,
  description: /^[a-zA-ZåäöÅÄÖ0-9.,!&\- "]+$/,
  trailerURL:
    /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/,
  createdAt:
    /^20(?:2[4-9]|[3-4][0-9])-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1]) (?:[0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
};

const postNewMovie = async (req: Request, res: Response) => {
  const { movie, images, categories, reviews }: MovieBody = req.body;
 

  if (movie) {
    for (const [key, value] of Object.entries(movie)) {
      console.log("key: " + key + " value: " + value)
      if (!movieRegExes[key].test(value)) {
        console.log("movie invalid: key: ", key + " value: " + value)
        return res
          .status(400)
          .json({ msg: "Bad request, missing parameters" });
      }
    }
  }

  if ((!categories || (categories && categories.length === 0)) || (!images || (images && (images.encodedPoster.length === 0 || images.encodedSlide.length === 0)))) {
    console.log("categories error");
    return res.status(400).json({ msg: "Bad request, missing parameters" });
  }

  if (reviews && reviews.length === 0 || !reviews.every((review) => Object.entries(review).every(([key, value]) => reviewsRegExes[key].test(value)))) {
    console.log("reviews error")
    return res.status(400).json({ msg: "Bad request, missing parameters" });
  }

  try {
    await movieService.saveNewMovie({ movie, categories, reviews, images });
    return res.status(201).json({ msg: "Successfully saved movie" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }

}
export default { postNewMovie };
