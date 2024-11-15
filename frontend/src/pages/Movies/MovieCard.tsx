import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ageRatingUtil } from "../../utils/ageRatingUtil";

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
};
export default function MovieCard({id, title, age, categories, posterURL, releaseYear,  lang, sub }: MoviesPageMovie) {
  
  return (
    <Col xs={12} sm={6}>
      <Card>
        <Row>
          <Col xs={12} className="movie-card">
            <Card.Img src={posterURL} className="shadow-lg w-100 movie-card-img" />
            <Card.Body className="movie-card-body d-flex flex-column align-items-center w-100">
              <div className="movie-card-content-wrapper py-1">
                <Card.Title className="movie-card-title">
                  {title} ({releaseYear})
                </Card.Title>
                <Card.Text className="d-flex flex-row justify-content-around movie-card-genre">
                  <small>{categories}</small>
                </Card.Text>
                <Card.Text className="movie-card-lang-age d-flex flex-row justify-content-center gap-1">
                  <small>({lang})</small>
                  <small>{sub === "null" ? "" : `(${sub})`}</small>
                  <small>{ageRatingUtil(age.toString())}</small>
                </Card.Text>
                <Link to={`/filmer/${id}`}>
                  <Button variant="outline-secondary" className="mt-1 mb-1">
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