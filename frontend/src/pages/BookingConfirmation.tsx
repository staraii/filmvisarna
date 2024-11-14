import { Row, Col, Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { getWeekday } from "../utils/dateTimeUtils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DualQueryParams, loaderQuery } from "../utils/queryService";
import { useAuth } from "../utils/authContext"; 
import "./BookingConfirmation.css";

// Function to format ticket types
const ticketTypeTranslations: { [key: string]: string } = {
  Adult: "Vuxen",
  Child: "Barn",
  Senior: "Senior",
  Student: "Student",
};

const formatTicketTypes = (ticketTypes: string): string => {
  const typeCounts: { [type: string]: number } = {};

  ticketTypes.split(",").forEach((type) => {
    const trimmedType = type.trim();
    if (typeCounts[trimmedType]) {
      typeCounts[trimmedType]++;
    } else {
      typeCounts[trimmedType] = 1;
    }
  });

  return Object.entries(typeCounts)
    .map(([type, count]) => `${count} ${ticketTypeTranslations[type] || type}`)
    .join(", ");
};

// Helper function to check if the date is valid
const isValidDate = (date: string) => {
  const d = new Date(date);
  return !isNaN(d.getTime());
};

// Format booking date
const formatBookingDate = (bookingDate: string): string => {
  const dateTime = new Date(bookingDate);
  const formattedDate = dateTime.toLocaleDateString('sv-SE'); // Format the date in Swedish (YYYY-MM-DD)
  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time (HH:mm)
  return `${formattedDate} ${formattedTime}`; // Combine date and time
};


export default function BookingConfirmationPage() {
  const { queryParamsOne, queryParamsTwo } = useLoaderData() as DualQueryParams;
  const { data: screeningData } = useSuspenseQuery(loaderQuery(queryParamsOne));
  const { data: bookingData } = useSuspenseQuery(loaderQuery(queryParamsTwo));
  const { isAuthenticated } = useAuth();


  if (
    !screeningData?.success?.[0] ||
    !bookingData?.success?.[0]?.seats ||
    !bookingData?.success?.[0]?.bookingNumber
  ) {
    throw new Error("Åtkomst nekas: Bokningsdata saknas eller är ogiltig.");
  }

  const booking = bookingData.success[0];
  const screening = screeningData.success[0];

  // Check if screening.dateTime is valid, otherwise set it to a default value
  const screeningDateTime = isValidDate(screening.dateTime)
    ? new Date(screening.dateTime)
    : new Date(); // Set to current date/time if invalid

  const formattedDate = screeningDateTime.toLocaleDateString('sv-SE'); // Format date
  const formattedTime = screeningDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time

  // Format the booking date
  const formattedBookingDate = formatBookingDate(booking.bookingDate);

  const seatsDisplay = typeof booking.seats === 'string' 
    ? (booking.seats.split(',') as string[]).map((seat: string) => seat.trim()).join(', ') 
    : 'Inga platser valda';


  return (
    <>
      <h2>Tack för din bokning!</h2>
      <Container className="booking-confirmation">
        {/* Booking Details in mobile-like format */}
        <Row className="pt-4">
          <Col xs={12} className="detail-row">
            <div className="label-item">Film:</div>
            <div className="data-item">{screening.movieTitle}</div>
          </Col>

          <Col xs={12} className="detail-row">
            <div className="label-item">Visningstid:</div>
            <div className="data-item">{getWeekday(screening.dayName) + " " + formattedDate} {formattedTime}</div>
          </Col>

          <Col xs={12} className="detail-row">
            <div className="label-item">Platser:</div>
            <div className="data-item">{seatsDisplay}</div>
          </Col>

          <Col xs={12} className="detail-row">
            <div className="label-item">Bokningsnummer:</div>
            <div className="data-item">{booking.bookingNumber}</div>
          </Col>

          <Col xs={12} className="detail-row">
            <div className="label-item">Bokningsdatum:</div>
            <div className="data-item">{formattedBookingDate}</div>
          </Col>

          <Col xs={12} className="detail-row">
            <div className="label-item">Biljett:</div>
            <div className="data-item">{formatTicketTypes(booking.ticketTypes)}</div>
          </Col>

          <Col xs={12} className="detail-row">
            <div className="label-item">Totalt pris:</div>
            <div className="data-item">{booking.totalPrice} kr</div>
          </Col>
        </Row>

        {/* Conditionally render message based on authentication status */}
        <p className="pt-4 lead">
          {isAuthenticated
            ? "Tack för din bokning! Du kan nu hitta din bokning på din profil."
            : "Bokningsbekräftelse skickas strax via e-post. Bli medlem för att kunna se din bokning direkt på hemsidan."}
        </p>
      </Container>
    </>
  );
}
