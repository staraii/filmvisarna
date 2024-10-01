import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "./MovieCard";

const movies = [
  {
    title: "Titanic",
    year: "1996",
    genres: "Drama, Romantik",
    lang: "Eng.tal",
    sub: "Sv.text",
    age: "15+",
    poster: "/titanic_poster.jpg",
  },
  {
    title: "Sleepers",
    year: "1992",
    genres: "Thriller, Drama",
    lang: "Eng.tal",
    sub: "Sv.text",
    age: "15+",
    poster: "/sleepers_poster.jpg",
  },
  {
    title: "Pippi",
    year: "1987",
    genres: "Svenskt, Barnfilm",
    lang: "Sv.tal",
    sub: "ingen text",
    age: "Barntillåten",
    poster: "/pippi_poster.jpg",
  },
  {
    title: "Heat",
    year: "1992",
    genres: "Action, Drama",
    lang: "Eng.tal",
    sub: "Sv.text",
    age: "15+",
    poster: "/HeatPoster.PNG",
  },
];

export default function Movies() {
  return (
    <Container as="main" fluid className="pb-5 mb-5">
      <Row>
        <Col xs={12}>
          <h3 className="my-4">Aktuella Filmer</h3>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className="row-gap-5">
        {movies.map((movie, movIndex) => (<MovieCard key={movIndex} {...movie} />))}
      </Row>
    </Container>
  );
}
