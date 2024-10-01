import "./bookingPage.css";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";

import { useEffect, useState } from "react";

export default function BookingPage() {
  const [ticketAdult, setticketAdult] = useState<number>(2);
  const [ticketChild, setTicketChild] = useState<number>(0);
  const [ticketSenior, setTicketSenior] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(2);

  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [hoveredSeats, setHoveredSeats] = useState<string[]>([]);

  //För mockupen ska vara godkänd måste man kunna välja 3 olika biljetter, fixa padding mellan biljetter och stolar, ta bort siffror från stolarna, fixa mobilvyn,
  //bokningsknappen ska vara stylad bättre, hur ska det se ut om man har 3 biljetter men highlightar de 2 sista i stolsraden? skriva om
  //bootstrap till bootrap react, dela upp i komponenter?. mockup data för redan bokade platser

  //fixade route till boka, fixade biljetter, bokningsknapp, fungerar i mobilvy ner till 368 pixlar(finns något bootstrap relaterat som inte vill gå under viss width)
  //tbd begränsningar, bokningsbekräftelse, mockup data för stolar

  const preBooked = ["5:2", "5:3", "2:4", "2:5", "7:7", "7:8", "7:9"];

  useEffect(() => {
    setTickets(ticketAdult + ticketSenior + ticketChild);
  }, [ticketAdult, ticketSenior, ticketChild]);

  const seats = {
    1: 8,
    2: 9,
    3: 10,
    4: 10,
    5: 10,
    6: 10,
    7: 12,
    8: 12,
  };
  function displaySeats(row: number, index: number, seatCount: number) {
    let hoveredSeatIds: string[] = [];

    for (let i = 0; i < tickets; i++) {
      const currentSeatIndex = index + i + 1;
      const seatId = `${row}:${currentSeatIndex}`;

      // If any seat in the range is prebooked or exceeds seat count, keep the previous hover state
      if (currentSeatIndex > seatCount || preBooked.includes(seatId)) {
        return; // Exit early, keeping the previous hovered seats
      }

      hoveredSeatIds.push(seatId); // Add seatId to the new hovered set
    }

    // If all seats are valid, clear the previous hovered seats and update with the new selection
    setHoveredSeats(hoveredSeatIds);
  }

  const seatGrid = Object.entries(seats).map(([row, seatCount]) => (
    <div key={row} className="d-flex flex-row-reverse">
      <div className="">
        {Array.from({ length: seatCount })
          .map((_, index) => {
            const seatId = `${row}:${index + 1}`;
            const isPreBooked = preBooked.includes(seatId);
            return (
              <Button
                onClick={() => handleSeatSelect()}
                onMouseOver={() => displaySeats(Number(row), index, seatCount)}
                key={seatId}
                className={`seat ${isPreBooked ? "booked-seat" : ""} ${
                  hoveredSeats.includes(seatId) ? "hovered-seat" : ""
                }
                  ${selectedSeat.includes(seatId) ? "seat-selected" : ""} }
                `}
                variant=""
              ></Button>
            );
          })
          .reverse()}
      </div>
    </div>
  ));
  //gör om sätena till en klass? seatgrid constructor

  function handleSeatSelect() {
    let seatIds: string[] = [];

    for (let i = 0; i < tickets; i++) {
      let seat = hoveredSeats[i];
      if (seat) seatIds.push(seat);
    }

    setSelectedSeat(seatIds);
  }

  return (
    <>
      <body className=" h-auto d-flex flex-column container ">
        <Stack className="container booking-header">
          <Row className="pt-4">
            <Col className=" ">
              <h1 className="">Heat</h1>
            </Col>
            <Col className="pt-2">
              <h5>onsdag 18 sep</h5>
              <h5 className="">21:00-22:43</h5>
            </Col>
            <Col className="pt-2">
              <p>(Sv.text) (Eng.tal)</p>
              <p> 12+</p>
            </Col>
          </Row>
        </Stack>
        <div className="d-flex w-100 justify-content-center">
          <section className="container bg-white w-50 row">
            <div className="border-2 border-black"></div>
          </section>
        </div>

        <div className="w-100 h-100 border-end border-start p-3 d-flex flex-column">
          <h4>Stora salongen</h4>
          <Stack className="p-1 ">
            <Stack direction="horizontal">
              <Button
                onClick={() =>
                  setticketAdult((prevTickets) => Math.max(prevTickets - 1, 0))
                }
              >
                -
              </Button>
              <p className="m-3 ">{ticketAdult}</p>
              <Button
                onClick={() => setticketAdult((prevTickets) => prevTickets + 1)}
              >
                +
              </Button>
              <p className="m-2">Standard: 140 kr</p>
            </Stack>
            <Stack direction="horizontal">
              <Button
                onClick={() =>
                  setTicketChild((prevTickets) => Math.max(prevTickets - 1, 0))
                }
              >
                -
              </Button>
              <p className="m-3">{ticketChild}</p>
              <Button
                onClick={() => setTicketChild((prevTickets) => prevTickets + 1)}
              >
                +
              </Button>
              <p className="m-2">Barn: 80 kr</p>
            </Stack>
            <Stack direction="horizontal">
              <Button
                onClick={() =>
                  setTicketSenior((prevTickets) => Math.max(prevTickets - 1, 0))
                }
              >
                -
              </Button>
              <p className="m-3">{ticketSenior}</p>
              <Button
                onClick={() =>
                  setTicketSenior((prevTickets) => prevTickets + 1)
                }
              >
                +
              </Button>
              <p className="m-2">Senior : 120 kr</p>
            </Stack>
          </Stack>

          <Stack className="seat-container pt-5 mx-auto justify-content-center align-items-center">
            {seatGrid}
          </Stack>
        </div>
      </body>
      <footer className="d-flex justify-content-center align-items-center container booking-header flex-row justify-content-around ">
        <h4>Order:</h4>
        <span>
          <p>Biljetter: {tickets}</p>
          <Row xs="auto">
            <p>Platser: </p>
            {selectedSeat.map((seat, key) => (
              <p key={key}>{seat + " "}</p>
            ))}
          </Row>
          <p className="pt-1">
            Att betala:{" "}
            {ticketAdult * 140 + ticketChild * 80 + ticketSenior * 120}kr
          </p>
        </span>
        <div>
          <input
            className="m-2"
            type="text"
            name=""
            id=""
            placeholder="E-post"
          />
          <a href="/order-bekraftelse">
            <Button className="booking-btn">
              <h5 className="m-1">Boka</h5>
            </Button>
          </a>
        </div>
      </footer>
    </>
  );
}
