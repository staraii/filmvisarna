
import { db } from "../index.js";
import { Reviews, Categories, Movie } from "../types/movieTypes.js"
import SaveImagesToDir from "../utils/saveImagesToDir.js";
import { ResultSetHeader } from "mysql2";

interface MovieData {
  movie: Movie;
  reviews: Reviews[];
  categories: Categories;
  images: {
    encodedPoster: string;
    encodedSlide: string;
    encodedPostersList: string[];
  }
}
const saveNewMovie = async ({ movie, reviews, categories, images }: MovieData) => {
  const saveImages = new SaveImagesToDir(images.encodedPoster, images.encodedSlide, images.encodedPostersList)
   
  const connection = await db.getConnection();  
  try {
    
    await connection.beginTransaction();

    const [newMovie] = await connection.execute<ResultSetHeader>(
      "INSERT INTO `movies` (`title`, `ageRating`, `createdAt`, `details`) VALUES (?, ?, ?, ?)",
      [movie.title, movie.ageRating, new Date().toLocaleString("sv-SE"), {details: "to be updated"}]
    );
    const movieId = newMovie.insertId;
    const filenames = await saveImages.saveImageFiles(movieId.toString());
    const slideURL = filenames[0];
    const posterURL = filenames.slice(1);
    const details = {
      credits: {
        cast: movie.cast.split(", "),
        directedBy: movie.directedBy.split(", "),
      },
      duration: Number(movie.duration),
      mediaURLs: {
        slideURL: slideURL,
        posterURL: posterURL,
        trailerURL: movie.trailerURL,
      },
      subtitles: `${movie.subtitles}.text`,
      spokenLanguage: `${movie.spokenLanguage}.tal`,
      description: movie.description,
      releaseYear: Number(movie.releaseYear),
    };
    const transactionList = [
      connection.execute("UPDATE `movies` SET `details` = ? WHERE `id` = ?", [details, movieId]),
      ...reviews.map((review) => connection.execute("INSERT INTO `reviews` (`movieId`, `review`) VALUES(?, ?)", [movieId, review])),
      ...categories.map((cat) => connection.execute("INSERT INTO `moviesCategories` (`movieId`, `categoryId`) VALUES (?, ?)", [movieId, cat]))
    ];
    await Promise.all(transactionList);
    await connection.commit();
  } catch (error) {
    console.error(error);
    await connection.rollback();
    throw new Error("Error saving movie to database");
  } finally {
    connection.release();
  }
}

export default { saveNewMovie }

