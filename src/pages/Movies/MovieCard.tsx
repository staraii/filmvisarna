import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

type MovieCardProps = {
  title: string;
  year: string;
  genres: string;
  lang: string;
  sub: string;
  age: string;
  poster: string;
}

export default function MovieCard({title, year, genres, lang, sub, age, poster}: MovieCardProps) {
  
  return (
    <Col xs={12} sm={6}>
      <Card>
        <Row>
          <Col xs={12} className="movie-card">
            <Card.Img src={poster} className="shadow-lg w-100 movie-card-img" />
            <Card.Body className="movie-card-body d-flex flex-column align-items-center w-100">
              <div className="movie-card-content-wrapper">
                <Card.Title className="movie-card-title">
                  {title} ({year})
                </Card.Title>
                <Card.Text className="d-flex flex-row justify-content-around movie-card-genre">
                  <small>{genres}</small>
                </Card.Text>
                <Card.Text className="movie-card-lang-age d-flex flex-row justify-content-center gap-1">
                  <small>({lang})</small>
                  <small>({sub})</small>
                  <small>{age}</small>
                </Card.Text>
                <Link to="/film">
                  <Button variant="secondary" className="mt-1 mb-1">
                    Mera info
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}