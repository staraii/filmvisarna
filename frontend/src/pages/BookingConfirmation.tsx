import { Row, Col, Container } from "react-bootstrap";
import { useLoaderData, useLocation } from "react-router-dom";
import getWeekday from "../utils/getWeekday";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DualQueryParams, loaderQuery } from "../utils/queryService";
import ErrorPage from "./ErrorPage/ErrorPage";

export default function BookingConfirmationPage() {
  const { queryParamsOne, queryParamsTwo } = useLoaderData() as DualQueryParams;
  const { data: screeningData } = useSuspenseQuery(loaderQuery(queryParamsOne));
  const { data: bookingData } = useSuspenseQuery(loaderQuery(queryParamsTwo));

  const booking = bookingData["success"][0];
  const screening = screeningData["success"][0]; //den hämtar fortfarande alla visningar tror jag.

  // const location = useLocation();
  // const { selectedSeats, price, screeningData } = location.state || {
  //   tickets: 0,
  //   price: 0,
  //   screeningData: {},
  // };
  return (
    <>
      <h2>Tack för din bokning!</h2>
      <Container className="">
        <Row className="pt-4">
          <Col>
            <h4>Film</h4>
            <h4>Tid</h4>
            <h4>Platser</h4>
            <h4>BokningsId</h4>
            <h4>Pris</h4>
          </Col>
          <Col>
            <p className="">{screening.movieTitle}</p>
            <p>
              {getWeekday(screening.dayName) +
                " " +
                screening.dateTime.split("T")[0]}
            </p>
            <p>{booking.seats}</p>
            <p>{booking.bookingNumber}</p>
            <p>{booking.totalPrice} kr</p>
          </Col>
          <p className="pt-4">bokningsbekräftelse kommer snart på eposten</p>
        </Row>
      </Container>
    </>
  );
}
