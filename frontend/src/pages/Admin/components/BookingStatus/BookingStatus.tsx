import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import { loaderQuery } from "../../../../utils/queryService";
import { QueryParams } from "../../../../utils/queryService";

import { getParsedDateTime } from "../../../../utils/dateTimeUtils";
import reqUtil from "../../../../utils/reqUtil";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface Booking {
  bookingId: number;
  bookingNumber: string;
  screeningId: number;
  screeningTime: string;
  movieTitle: string;
  theatre: string;
  userId: number;
  email: string;
  seats: string;
  ticketTypes: string;
  totalPrice: number;
  isPayed: number;
  isActive: number;
  bookingDate: string;
}
interface Ticket {
  type: string;
  count: number;
  [key: string]: string | number;
}
const ticketNames: {[key:string]: string} = {
  "Adult": "Vuxen",
  "Child": "Barn",
  "Senior": "Pensionär"
}

export default function BookingStatus() {
  const queryClient = useQueryClient();
  const queryParams = useLoaderData() as QueryParams;
  const { data } = useQuery(loaderQuery(queryParams));
  const booking: Booking = data[0];
  const navigate = useNavigate();
  const updateBookingStatus = async () => {
    const { data } = await reqUtil(
      "PUT",
      `/api/bookings/fullBookings?bookingNumber=${queryParams.id}&${
        booking.isPayed === 0 ? "isPayed=1" : "isActive=0"
      }`
    );
    return data;
  };
  const mutateBookingStatus = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryParams.queryName, queryParams.query, queryParams.id] }),
  });

  
  const { month, date, dayName, time } = getParsedDateTime(
    booking.screeningTime
  );
  const handleStatusUpdate = () => {
    mutateBookingStatus.mutate();
    if (booking.isPayed === 1) {
      navigate("/admin/biljetter");
    }
  }

  // Ticket types
  const ticketArray = booking?.ticketTypes.length > 0 ? booking.ticketTypes.split(", ") : [];
  const ticketCount: { [key: string]: number } = {};
  ticketArray.forEach((type) => {
    ticketCount[type] = (ticketCount[type] || 0) + 1;
  });
  const tickets: Ticket[] = Object.entries(ticketCount).map(([type, count]) => {
    return {
      type: ticketNames[type],
      count: count,
    };
  });

  return (
    <Container className="d-flex flex-column justify-content-around mt-4 py-5">
      <Row className="d-flex flex-column justify-content-center">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="px-3">
          {/* Bokningsnummer */}
          <Row className="mb-2">
            <Col xs={12}>
              <p className="fs-5">
                <span className="text-secondary">Bokningsnummer </span>
                {booking.bookingNumber}
              </p>
            </Col>
          </Row>
          {/* Betalningsstatus */}
          {booking.isPayed === 0 && (
            <Row className="mb-2">
              <Col>
                <p className="fs-2 text-center text-danger">Ej betald</p>
              </Col>
            </Row>
          )}
          {/* Filmtitel */}
          <Row>
            <Col xs={12}>
              <p className="fs-2 fw-bold ">{booking.movieTitle}</p>
            </Col>
          </Row>
          {/* Tid och datum */}
          <Row className="px-4">
            <Col xs={12}>
              <p className="fs-3 text-start text-secondary d-flex flex-row justify-content-between">
                <span>
                  {dayName} {date}/{month}
                </span>
                <span>{time}</span>
              </p>
            </Col>
          </Row>
          {/* Salong */}
          {booking.isPayed === 1 && (
            <Row className="px-3">
              <Col xs={12}>
                <p className="fs-5 ">
                  {booking.theatre}
                </p>
              </Col>
            </Row>
          )}

          {/* Biljetter */}
          {booking.isPayed === 0 && (
            <Row className="px-4">
              <Col xs={12} className="border border-secondary rounded">
                {tickets.map((ticket: Ticket, index) => (
                  <Row key={index}>
                    <Col>
                      <p className="fs-5 text-start mt-2">
                        <span className="text-secondary ms-3 me-3">
                          {ticket.type}
                        </span>
                        {ticket.count} st
                      </p>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          )}

          {booking.isPayed === 0 && (
            <Row className="my-5">
              <Col>
                <p className="fs-2 text-center">
                  Totalt: {booking.totalPrice} kr
                </p>
              </Col>
            </Row>
          )}

          {booking.isActive === 0 && (<Row>
            <Col>
              <p className="text-danger fs-4">Biljetterna är redan använda</p>
            </Col>
          </Row>)}
          {booking.isPayed === 1 && 
            booking.ticketTypes.split(", ").map((ticket, index) => {
              return (
                <Row
                  key={index}
                  className={`border ${booking.isActive === 0 ? "border-danger" : "border-secondary"} rounded my-4`}
                >
                  <Col
                    xs={4}
                    sm={8}
                    className="d-flex flex-row justify-content-center align-items-center"
                  >
                    <p className="fs-4 text-secondary m-auto">{index + 1}</p>
                  </Col>
                  <Col
                    xs={8}
                    sm={8}
                    className="d-flex flex-column justify-content-center align-items-start py-2"
                  >
                    <p className="align-middle my-auto">
                      {ticketNames[ticket]}
                    </p>
                    <p className="align-middle my-auto">
                      <small className="text-secondary">Platsnummer: </small>
                      {booking.seats.split(", ")[index]}
                    </p>
                  </Col>
                </Row>
              );
            })}
          <Row>
            <Col>
              <Form method="PUT" action="">
                <input
                  type="hidden"
                  name="bookingNumber"
                  value={booking.bookingNumber}
                />
                <Button
                  type="button"
                  variant="outline-secondary w-75"
                  onClick={handleStatusUpdate}
                  disabled={booking.isActive === 0}
                >
                  {booking.isPayed === 0
                    ? "Ändra till betald"
                    : "Riv biljetter"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
