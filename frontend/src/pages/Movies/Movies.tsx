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


type MoviesPageMovie = {
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
  const movies: MoviesPageMovie[] = data;
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
