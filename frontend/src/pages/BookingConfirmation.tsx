import { Row, Col, Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { getWeekday } from "../utils/dateTimeUtils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DualQueryParams, loaderQuery } from "../utils/queryService";
import ErrorPage from "./ErrorPage/ErrorPage";

export default function BookingConfirmationPage() {
  const { queryParamsOne, queryParamsTwo } = useLoaderData() as DualQueryParams;
  const { data: screeningData } = useSuspenseQuery(loaderQuery(queryParamsOne));
  const { data: bookingData } = useSuspenseQuery(loaderQuery(queryParamsTwo));

  const booking = bookingData["success"][0];
  const screening = screeningData["success"][0]; //den hämtar fortfarande alla visningar tror jag.

  return (
    <>
      <h2>Tack för din bokning!</h2>
      <Container className="">
        <Row className="pt-4">
          <Col className="">
            <h4 className="m-3 mt-0">Film</h4>
            <h4 className="m-3">Tid</h4>
            <h4 className="m-3">Platser</h4>
            <h4 className="m-3">Salong</h4>
            <h4 className="m-3">BokningsId</h4>
            <h4 className="m-3">Pris</h4>
          </Col>
          <Col>
            <p className="lead mt-1">{screening.movieTitle}</p>
            <p className="lead">
              {getWeekday(screening.dayName) +
                " " +
                screening.dateTime.split("T")[0]}
            </p>
            <p className="lead">{booking.seats}</p>
            <p className="lead">{screening.theatreName}</p>

            <p className="lead">{booking.bookingNumber}</p>
            <p className="lead">{booking.totalPrice} kr</p>
          </Col>
          <p className="pt-4 lead">
            bokningsbekräftelse kommer strax på eposten
          </p>
        </Row>
      </Container>
    </>
  );
}
