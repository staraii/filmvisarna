import fileToBase64 from "../../../utils/fileToBase64";
import { Movie, Review } from "../AdminTypes";
import { useMutation } from "react-query";
import reqUtil from "../../../utils/reqUtil";
import { useNavigate } from "react-router-dom";


interface NewMovieServiceProps {
  movie: Movie;
  // files: {
  //   poster: File;
  //   slide: File;
  //   postersList: File[];
  // },
  files: Files;
  categories: string[];
  reviews: Review[];
}
interface Files {
  poster: File;
  slide: File;
  postersList: File[];
}
type EncodedImages = {
  encodedPoster: string;
  encodedSlide: string;
  encodedPostersList: string[];
}
interface AddNewMovie {
  movie: Movie;
  categories: string[];
  reviews: Review[];
  images: EncodedImages;
}

export default function useNewMovieService() {
  const navigate = useNavigate();


  const encodeImageFiles = async (files: Files) => {
    const encodedPoster = (await fileToBase64(files.poster)) as string;
    const encodedSlide = (await fileToBase64(files.slide)) as string;
    const encodedPostersList = (await Promise.all(
      files.postersList.map((file: File) => fileToBase64(file))
    )) as string[];
    return { encodedPoster, encodedSlide, encodedPostersList } as EncodedImages;
  }
  
  

  const uploadNewMovie = useMutation({
    mutationFn: (newMovie: AddNewMovie) => {
      return reqUtil("POST", "/api/movies/", { newMovie }
      )
    },
    onSuccess: () => {
      navigate("/admin/");
    }
  }) 

  async function addNewMovie({ movie, files, categories, reviews }: NewMovieServiceProps){
    const images: EncodedImages = await encodeImageFiles(files);
    const body = { movie, images, categories, reviews };
    uploadNewMovie.mutate(body);
  }


//   const movieDefaults: Movie = {
//   title: "",
//   ageRating: "",
//   createdAt: "",
//   cast: "",
//   directedBy: "",
//   duration: "",
//   trailerURL: "",
//   subtitles: "",
//   spokenLanguage: "",
//   description: "",
//   releaseYear: "",
// };
  // const newMovie = {
  //   movie: {
  //     title: movie.title,
  //     ageRating: movie.ageRating,
  //     details: {
  //       credits: {
  //         cast: [...movie.cast.split(", ")],
  //         directedBy: [...movie.directedBy.split(", ")],
  //         duration: movie.duration,
  //         mediaURLs: {
  //           slideURL: files.slide.name,

  //         }
  //       }
  //     }
  //   }
  // }
  return { addNewMovie };
}