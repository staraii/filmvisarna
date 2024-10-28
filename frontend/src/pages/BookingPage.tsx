import "./bookingPage.css";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { loaderQuery, QueryParams } from "../utils/queryService";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function BookingPage() {
  const [ticketAdult, setticketAdult] = useState<number>(2);
  const [ticketChild, setTicketChild] = useState<number>(0);
  const [ticketSenior, setTicketSenior] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(2);
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [hoveredSeats, setHoveredSeats] = useState<string[]>([]);
  //react easier state add?

  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));

  const screening = data["success"][0]; //måste ta reda på varför detta sker

  console.log(screening);

  //placeholder
  const preBooked = ["5:2", "5:3", "2:4", "2:5", "7:7", "7:8", "7:9"];
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
  //placeholder

  useEffect(() => {
    setTickets(ticketAdult + ticketSenior + ticketChild);
  }, [ticketAdult, ticketSenior, ticketChild]);

  function displaySeats(row: number, index: number, seatCount: number) {
    let hoveredSeatIds: string[] = [];

    for (let i = 0; i < tickets; i++) {
      const currentSeatIndex = index + i + 1;
      const seatId = `${row}:${currentSeatIndex}`;
      if (currentSeatIndex > seatCount || preBooked.includes(seatId)) {
        return;
      }
      hoveredSeatIds.push(seatId);
    }
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
      <Stack className="">
        <Stack className="container booking-header justify-content-center">
          <Row className="pt-4">
            <Col>
              <h1 className="">{screening.movieTitle}</h1>
            </Col>
            <Col className="pt-2">
              <h5>
                {screening.dayName + " " + screening.dateTime.split("T")[0]}
              </h5>
              <h5 className="">{screening.time}</h5>
            </Col>
            <Col className="pt-2">
              <p>(Sv.text) (Eng.tal)</p>
              <p> 12+</p>
            </Col>
          </Row>
        </Stack>

        <Stack className="w-100 h-100 border-end border-start p-3 d-flex flex-column">
          <h4>{screening.theatreName}</h4>
          <Stack className="p-1">
            <Stack direction="horizontal">
              <Button
                onClick={() =>
                  setticketAdult((prevTickets) => Math.max(prevTickets - 1, 0))
                }
              >
                -
              </Button>
              <p className="m-3">{ticketAdult}</p>
              <Button
                onClick={() => setticketAdult((prevTickets) => prevTickets + 1)}
              >
                +
              </Button>
              <p className="m-3">Standard: 140 kr</p>
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
        </Stack>
      </Stack>
      <footer className="d-flex justify-content-center align-items-center container booking-summary flex-row justify-content-around ">
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
