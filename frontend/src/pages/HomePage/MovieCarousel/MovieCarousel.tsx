import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

type HomePageMovies = {
  movieId: number;
  movieTitle: string;
  createdAt: string;
  categories: string;
  slideURL: string;
  posterURL: string;
  releaseYear: string;
};

export default function MovieCarousel({ movies }: {movies: HomePageMovies[]}) {
  const navigate = useNavigate();
  return (
    <Carousel interval={5000} className="mb-2">
      {movies.map((movie) => (
        <Carousel.Item
          key={movie.movieId}
          onClick={() => navigate(`/filmer/${movie.movieId}`)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <Image src={`/images/${movie.slideURL}?url`} alt={movie.movieTitle} fluid />
          <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
            <h3 className="text-secondary mb-0">{movie.movieTitle}</h3>
            <p className="m-auto">{movie.categories}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
