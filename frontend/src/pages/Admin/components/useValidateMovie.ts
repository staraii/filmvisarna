import { useState, useEffect } from "react";
import { Movie, Review, FilesDefault } from "../AdminTypes";


const movieRegExes = {
  title: /^[a-zA-ZåäöÅÄÖ0-9.,&\-" ]+$/,
  ageRating: /^(?:1|7|11|15)$/,
  duration: /^[1-9][0-9]*$/,
  releaseYear: /^19[0-9][0-9]$/,
  spokenLanguage: /^[a-zA-ZåäöÅÄÖ]{2,3}$/,
  subtitles: /^[a-zA-ZåäöÅÄÖ]{2,3}$/,
  cast: /^[a-zA-ZåäöÅÄÖ0-9.,\- ]+$/,
  directedBy: /^[a-zA-ZåäöÅÄÖ0-9.,\- ]+$/,
  description: /^[a-zA-ZåäöÅÄÖ0-9.,&\-" ]+$/,
  trailerURL:
    /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/,
};

const reviewsRegExes:{[key: string]: RegExp} = {
  rating: /^[1-5]$/,
  reviewBy: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
  review: /^[a-zA-ZåäöÅÄÖ0-9.,&_\-" ]+$/,
};

interface UseValidateMovieProps {
  movie: Movie;
  categories: string[];
  reviews: Review[];
  files: FilesDefault;
}

export default function useValidateMovie({movie, categories, reviews, files}: UseValidateMovieProps) {
  const [isInvalid, setIsInvalid] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {

      const validate = () => {
        const newValidityCheck: { [key: string]: boolean } = {};
        setErrors(() => []);
        let newIsValid = true;
        for (const [key, value] of Object.entries(movieRegExes)) {
          if (!value.test(movie[key])) {
            newValidityCheck[key] = true;
            newIsValid = false;
          }
        }
        if (reviews.length === 0) {
          newValidityCheck.reviews = true;
          newIsValid = false;
          setErrors((prevErr) => [...prevErr, "Lägg till minst en recension."]);
        }
        for (const review of reviews) {
          for (const [key, value] of Object.entries(review)) {
            if (!reviewsRegExes[key].test(value)) {
              newValidityCheck[key] = true;
              newIsValid = false;
            }
          }
        }
        if (categories.length === 0) {
          newIsValid = false;
          newValidityCheck.categories = true;
          setErrors((prevError) => [...prevError, "Ange minst en kategori"]);
        }

        if (!files.poster) {
          newIsValid = false;
          newValidityCheck.poster = true;
          setErrors((prevError) => [...prevError, "Lägg till en poster"]);
        }
        if (!files.slide) {
          newValidityCheck.slide = true;
          newIsValid = false;
          setErrors((prevError) => [
            ...prevError,
            "Lägg till en bakgrund/slide",
          ]);
        }
        setIsValid(newIsValid);
        setIsInvalid(newValidityCheck);
      };


    validate();
  }, [movie, categories, reviews, files])


  return {errors, isValid, isInvalid}
}
