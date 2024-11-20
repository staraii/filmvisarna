import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getParsedDateTime } from "../../../utils/dateTimeUtils";
import { ageRatingUtil } from "../../../utils/ageRatingUtil";

export type ScreeningCardProps = {
  screeningId: number;
  movieId: number;
  movieTitle: string;
  dateTime: string;
  occupiedPercent: number;
  ageRating: string;
  slideURL: string;
  posterURL: string;
  subtitles: string;
  spokenLanguage: string;
  posterPreview?: string;
  slidePreview?: string;
};

export default function ScreeningCard({
  screeningId,
  movieId,
  occupiedPercent,
  ageRating,
  slideURL,
  posterURL,
  subtitles,
  spokenLanguage,
  dateTime,
  movieTitle,
  slidePreview,
  posterPreview,
}: ScreeningCardProps) {
  const navigate = useNavigate();
  occupiedPercent = 0;
  const soldOut = occupiedPercent > 99 ? true : false;
  const { month, date, dayName, time } = getParsedDateTime(dateTime);
  const age = ageRatingUtil(ageRating.toString());
  const handleNavigate = (navString: string) => {
    if (posterPreview || slidePreview) {
      return
    } else {
      navigate(navString);
    }
  }
  return (
    <Col xs={12}>
      <Card
        border="border-dark rounded"
        className={`screening-card shadow-lg ${
          soldOut ? "screening-card-sold-out" : ""
        }`}
      >
        <Card.Img
          src={slidePreview ? slidePreview : `/images/${slideURL}?url`}
          className={`overlay-image rounded d-block ${
            soldOut ? "overlay-image-sold-out" : ""
          }`}
        />
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
                    src={
                      posterPreview ? posterPreview : `/images/${posterURL}?url`
                    }
                    className={`w-100 rounded shadow-lg poster ${
                      soldOut ? "poster-sold-out" : ""
                    }`}
                    style={{
                      border: "2px solid #0b0815",
                      aspectRatio: "2 / 3",
                      cursor: "pointer",
                    }}
                    alt={`${movieTitle} poster`}
                    // onClick={ () => navigate(`/filmer/${movieId}`)}
                    onClick={() => handleNavigate(`/filmer/${movieId}`)}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xs={6}
              sm={6}
              className={`h-100 d-flex flex-column justify-content-between p-0 pe-3 pb-2 ${
                soldOut ? "sold-out" : ""
              }`}
            >
              <Row>
                <Col xs={12} className="pb-0">
                  <Card.Text as="h3" className="text-end date-time-font">
                    {/* {getWeekday(dayName)} */}
                    {dayName}
                  </Card.Text>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="pb-0">
                  <Card.Text as="h3" className="text-end date-time-font">
                    {date}/{month}
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
            <Col xs={6}>
              <Card.Text className="fw-lighter text-start lang-sub-font">
                {spokenLanguage}
                {subtitles === "null" ? "" : `, ${subtitles}`}
              </Card.Text>
            </Col>
            <Col xs={6}>
              <Card.Text
                className="text-end age-font"
                style={{ opacity: `${soldOut ? "0.5" : "1"}` }}
              >
                {age}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mt-1 mb-1">
              <Card.Text
                className={`d-flex flex-row justify-content-end align-items-center gap-2 tickets-status ${
                  occupiedPercent > 99
                    ? "ticket-status-sold-out"
                    : occupiedPercent > 80
                    ? "red"
                    : occupiedPercent > 50
                    ? "yellow"
                    : "green"
                }`}
              >
                {occupiedPercent > 99
                  ? "Slutsålt"
                  : occupiedPercent > 80
                  ? "Nästan slutsålt"
                  : occupiedPercent > 50
                  ? "Färre platser kvar"
                  : "Många platser kvar"}
              </Card.Text>
            </Col>
          </Row>
          <Row className="">
            <Col xs={12} className="h-100 py-2">
              <Button
                variant="outline-secondary"
                as="button"
                className="w-100 book-button-screening-card"
                //onClick={() => navigate(`/boka/${screeningId}`)}
                onClick={() => handleNavigate(`/boka/${screeningId}`)}
                disabled={soldOut}
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
