import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


type ScreeningCardProps = {
  img: string;
  slide: string;
  title: string;
  lang: string;
  sub: string;
  age: string;
  day: string;
  date: string;
  time: string;
  theatre: string;
  status: string;
  genre: string[];
}

export default function ScreeningCard({ img, slide, lang, sub, age, date, time, status, day }: ScreeningCardProps) {
  const navigate = useNavigate();
  return (
    <Col xs={12}>
      <Card border="border-dark rounded" className="screening-card shadow-lg">
        <Card.Img src={slide} className="overlay-image rounded d-block" />
        <Card.ImgOverlay className="rounded overlay-content">
          <Row className="d-inline-flex flex-row justify-content-between mb-0">
            <Col
              xs={6}
              sm={6}
              className="d-flex flex-column justify-content-around align-items-start mb-0 h-100"
            >
              <Row>
                <Col xs={12} className="column-gap-2">
                  <img
                    src={img}
                    className="w-100 rounded shadow-lg"
                    style={{
                      border: "2px solid #0b0815",
                      aspectRatio: "2 / 3",
                    }}
                    onClick={() => navigate("/film")}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xs={6}
              sm={6}
              className="h-100 d-flex flex-column justify-content-between p-0 pe-3 pb-2"
            >
              <Row>
                <Col xs={12} className="pb-0">
                  <Card.Text as="h3" className="text-end date-time-font">
                    {day}
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="pb-0">
                  <Card.Text as="h3" className="text-end date-time-font">
                    {date}
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="mt-0 mb-auto pt-0">
                  <Card.Text as="h3" className="text-end date-time-font">
                    {time}
                  </Card.Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={9}>
              <Card.Text className="fw-lighter text-start lang-sub-font">
                {lang}, {sub}
              </Card.Text>
            </Col>
            <Col xs={3}>
              <Card.Text className="text-end age-font">{age}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mt-1 mb-1">
              <Card.Text
                className={`d-flex flex-row justify-content-end align-items-center gap-2 tickets-status ${
                  status === "Low"
                    ? "red"
                    : status === "Medium"
                    ? "yellow"
                    : "green"
                }`}
              >
                {status === "Low"
                  ? "Få biljetter kvar"
                  : status === "Medium"
                  ? "Färre biljetter kvar"
                  : "Lediga platser"}
              </Card.Text>
            </Col>
          </Row>
          <Row className="">
            <Col xs={12} className="h-100 py-2">
              <Button
                variant="outline-secondary"
                as="button"
                className="w-100 book-button-screening-card"
                onClick={() => navigate("/boka")}
              >
                Boka
              </Button>
            </Col>
          </Row>
        </Card.ImgOverlay>
      </Card>
    </Col>
  );
}