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
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  //För mockupen ska vara godkänd måste man kunna välja 3 olika biljetter, fixa padding mellan biljetter och stolar, ta bort siffror från stolarna, fixa mobilvyn,
  //bokningsknappen ska vara stylad bättre, hur ska det se ut om man har 3 biljetter men highlightar de 2 sista i stolsraden? skriva om
  //bootstrap till bootrap react, dela upp i komponenter?. mockup data för redan bokade platser

  //fixade route till boka, fixade biljetter, bokningsknapp, fungerar i mobilvy ner till 368 pixlar(finns något bootstrap relaterat som inte vill gå under viss width)
  //tbd begränsningar, bokningsbekräftelse, mockup data för stolar

  const preBooked = ["5:2", "5:3"];

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
      if (index + i < seatCount) {
        hoveredSeatIds.push(`${row}:${index + i + 1}`);
      }
    }
    setHoveredSeats(hoveredSeatIds);
  }
  function handleBookedSeats(preBooked: string[]) {
    //kod här för att hantera fulla säten
  }

  const seatGrid = Object.entries(seats).map(([row, seatCount]) => (
    <div key={row} className="d-flex flex-row-reverse">
      <div className="">
        {Array.from({ length: seatCount })
          .map((_, index) => {
            const seatId = `${row}:${index + 1}`;

            return (
              <Button
                onClick={() => handleSeatSelect(Number(row), index + 1)}
                onMouseOver={() => displaySeats(Number(row), index, seatCount)}
                key={seatId}
                className={`seat ${
                  hoveredSeats.includes(seatId) ? "hovered-seat" : ""
                }`}
                variant=""
              ></Button>
            );
          })
          .reverse()}
      </div>
    </div>
  ));
  //gör om sätena till en klass? seatgrid constructor

  function handleSeatSelect(row: number, index: number) {
    //med stolen row och index som utgångspunkt, välj sedan row + antalet biljetter som valts
    setSelectedSeat([]);
    let seat = index + 1;

    for (let i = 0; i < tickets; i++) {
      setSelectedSeat((oldSelectedSeat) => [
        ...oldSelectedSeat,
        row + ":" + (seat + i - 1) + " ",
      ]);
    }
  }
  handleBookedSeats(preBooked);
  return (
    <>
      <body className=" h-auto d-flex flex-column container ">
        <div className="container text-center booking-header">
          <div className="row pt-4">
            <div className=" col d-flex align-items-center">
              <h1 className="">Heat</h1>
            </div>
            <span className="col d-flex align-items-center">
              <h5>onsdag 18 sep</h5>
              <h5 className="p-1">21:00-22:43</h5>
            </span>
            <span className="col d-flex align-items-center">
              <p>(Sv.text) (Eng.tal)</p>
              <p> 12+</p>
            </span>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-center">
          <section className="container bg-white w-50 row">
            <div className="border-2 border-black"></div>
          </section>
        </div>

        <div className="w-100 h-100 bg-black p-3 d-flex flex-column">
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
      <footer className="d-flex w-100 justify-content-center align-items-center container booking-header flex-row justify-content-around">
        <h4>Order:</h4>
        <span>
          <p>Biljetter: {tickets}</p>
          <p>Platser: {selectedSeat}</p>
          <p>
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
