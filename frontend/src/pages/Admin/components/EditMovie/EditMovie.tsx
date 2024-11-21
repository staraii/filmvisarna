import { useSuspenseQuery } from "@tanstack/react-query";
import { loaderQuery } from "../../../../utils/queryService";
import { useLoaderData } from "react-router-dom";
import { QueryParams } from "../../../../utils/queryService";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface FullMovie {
  id: number;
  title: string;
  ageRating: number;
  createdAt: string;
  categories: string;
  reviews: Review[];
  details: MovieDetails;
}
interface Review {
  review: string;
  reviewBy: string;
  rating: number;
}
interface MovieDetails {
  credits: {
    cast: string[];
    directedBy: string[];
  }
  duration: number;
  mediaURLs: {
    slideURL: string;
    posterURL: string[];
    trailerURL: string;
  }
  subtitles: string;
  spokenLanguage: string;
  description: string;
  releaseYear: number;
}


export default function EditMovie() {
  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const movie: FullMovie = data[0];
  
  return <main className="admin-main">
    <Container>
      <Row>
        <Col>
          {/* <h4>Ändra/uppdatera film</h4> */}
          <p className="fs-4 my-3">{movie.title}</p>
        </Col>
      </Row>
    </Container>
  </main>;
}
