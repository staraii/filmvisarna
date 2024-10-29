import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "./MovieCard";
import {
  useSuspenseQuery
} from "@tanstack/react-query";
import { loaderQuery } from "../../utils/queryService";
import { useLoaderData } from "react-router-dom";
import { QueryParams } from "../../utils/queryService";

// const movies = [
//   {
//     title: "Titanic",
//     year: "1996",
//     genres: "Drama, Romantik",
//     lang: "Eng.tal",
//     sub: "Sv.text",
//     age: "15+",
//     poster: "/titanic_poster.jpg",
//   },
//   {
//     title: "Sleepers",
//     year: "1992",
//     genres: "Thriller, Drama",
//     lang: "Eng.tal",
//     sub: "Sv.text",
//     age: "15+",
//     poster: "/sleepers_poster.jpg",
//   },
//   {
//     title: "Pippi",
//     year: "1987",
//     genres: "Svenskt, Barnfilm",
//     lang: "Sv.tal",
//     sub: "ingen text",
//     age: "Barntillåten",
//     poster: "/pippi_poster.jpg",
//   },
//   {
//     title: "Heat",
//     year: "1992",
//     genres: "Action, Drama",
//     lang: "Eng.tal",
//     sub: "Sv.text",
//     age: "15+",
//     poster: "/heat_poster.jpg",
//   },
//   {
//     title: "Fight Club",
//     year: "1999",
//     genres: "Drama",
//     lang: "Eng.tal",
//     sub: "Sv.text",
//     age: "15+",
//     poster: "/fight_club_poster.jpg",
//   },
// ];

type HomePageMovie = {
  id: number;
  title: string;
  createdAt: string;
  age: string;
  categories: string;
  posterURL: string;
  releaseYear: string;
  lang: string;
  sub: string;
}
export default function Movies() {
  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const movies: HomePageMovie[] = data;
  //console.log(movies2)
  return (
    <Container as="main" fluid className="pb-5 mb-5" style={{paddingInline: "2rem"}}>
      <Row>
        <Col xs={12}>
          <h3 className="my-4">Aktuella Filmer</h3>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className="row-gap-5">
        {movies.map((movie) => (<MovieCard key={movie.id} {...movie} />))}
      </Row>
    </Container>
  );
}
