import "./bookingPage.css";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useLoaderData,
  Form,
  useActionData,
} from "react-router-dom";
import { loaderQuery, QueryParams } from "../utils/queryService";
import { useSuspenseQuery } from "@tanstack/react-query";
import getWeekday from "../utils/getWeekday";

interface RowSeats {
  seats: number;
  start: number;
  end: number;
}

type Seats = {
  [row: number]: RowSeats;
};

interface BookingActionData {
  bookingSuccess: boolean;
  bookingNumber?: string;
  error?: string;
}
export default function BookingPage() {
  const [ticketAdult, setticketAdult] = useState<number>(2);
  const [ticketChild, setTicketChild] = useState<number>(0);
  const [ticketSenior, setTicketSenior] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(2);
  const [selectedSeats, setSelectedSeat] = useState<string[]>([]);
  const [hoveredSeats, setHoveredSeats] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  //react easier state add?
  const [seats, setSeats] = useState<Seats>({});
  const [email, setEmail] = useState("");

  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const screeningData = data["success"][0];
  const actionData = useActionData() as BookingActionData;
  const navigate = useNavigate();
  if (screeningData.occupiedSeats === null) screeningData.occupiedSeats = "0";

  // useEffect(() => {
  //   console.log(screeningData);
  // }, []);

  useEffect(() => {
    if (actionData?.bookingSuccess) {
      navigate(
        `/boka/${screeningData.screeningId}/order-bekraftelse/${actionData.bookingNumber}`
      );
    }
  }, [actionData, navigate]);

  useEffect(() => {
    if (screeningData) {
      setSeats(
        screeningData.theatreName === "Stora salongen"
          ? {
              1: { seats: 8, start: 1, end: 8 },
              2: { seats: 9, start: 9, end: 17 },
              3: { seats: 10, start: 18, end: 27 },
              4: { seats: 10, start: 28, end: 37 },
              5: { seats: 10, start: 38, end: 47 },
              6: { seats: 10, start: 48, end: 57 },
              7: { seats: 12, start: 58, end: 69 },
              8: { seats: 12, start: 70, end: 81 },
            }
          : {
              1: { seats: 6, start: 1, end: 6 },
              2: { seats: 8, start: 7, end: 14 },
              3: { seats: 9, start: 15, end: 23 },
              4: { seats: 10, start: 24, end: 33 },
              5: { seats: 10, start: 34, end: 43 },
              6: { seats: 12, start: 44, end: 55 },
            }
      );
    }
  }, [screeningData]);
  useEffect(() => {
    window.scrollTo({
      top: 180,
      left: 0,
      behavior: "instant",
    });
  }, []);
  // nog skriva om SSE för att passa bättre här
  const [seatData, setData] = useState<{ num: number } | null>();
  useEffect(() => {
    const evtSource = new EventSource(
      `http://localhost:5173/api/events/${screeningData.screeningId}`
    );
    evtSource.onmessage = (event) => {
      if (event.data) {
        setData(JSON.parse(event.data));
      }
    };
    return () => {
      evtSource.close();
    };
  }, []);

  useEffect(() => {
    setPrice(ticketAdult * 140 + ticketSenior * 120 + ticketChild * 80);
    setTickets(ticketAdult + ticketSenior + ticketChild);
  }, [ticketAdult, ticketSenior, ticketChild]);

  function displaySeats(row: number, index: number) {
    if (!screeningData || !screeningData.occupiedSeats || tickets <= 0) return;

    const rowData = seats[row];
    if (!rowData) return;
    // console.log("rowData", rowData.start, rowData.end);
    // console.log("index ", index);
    // console.log("row ", row);
    let hoveredSeatIds: string[] = [];
    //console.log("hoveredseats", hoveredSeats);
    // console.log("seatcount", seatCount);
    // console.log("index", index);
    //index climbs for each seat but seatcount is set for each row, i need to limit the index per row
    //
    for (let i = 0; i < tickets; i++) {
      const currentSeatIndex = index + i;

      if (
        currentSeatIndex > rowData.end ||
        currentSeatIndex < rowData.start ||
        screeningData.occupiedSeats.includes(String(currentSeatIndex))
      ) {
        return;
      }
      hoveredSeatIds.push(String(currentSeatIndex));
    }
    setHoveredSeats(hoveredSeatIds);
  }

  let cumulativeIndex = 0;

  function handleSeatSelect(seatId: string) {
    let seatIds: string[] = [];
    //console.log("handleseatselect", "number", seatId, seatIds);
    setSelectedSeat(hoveredSeats);
  }

  return (
    <>
      <Stack className="">
        <Stack className="container booking-header justify-content-center">
          <Row className="pt-4">
            <Col>
              <h1 className="">{screeningData.movieTitle}</h1>
            </Col>
            <Col className="pt-2">
              <h5>
                {getWeekday(screeningData.dayName) +
                  " " +
                  screeningData.dateTime.split("T")[0]}
              </h5>
              <h5 className="">{screeningData.time}</h5>
            </Col>
            <Col className="pt-2">
              <p>(Sv.text) (Eng.tal)</p>
              <p> 12+</p>
            </Col>
          </Row>
        </Stack>

        <Stack className="w-100 h-100 border-end border-start p-3 d-flex flex-column">
          <h4>{screeningData.theatreName}</h4>
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
            {Object.entries(seats).map(([row, seatData]) => {
              const { seats: seatCount } = seatData as RowSeats;
              let rowCumulativeIndex = cumulativeIndex;

              return (
                <div key={row} className="d-flex flex-row-reverse">
                  <div>
                    {Array.from({ length: seatCount })
                      .map((_, index) => {
                        cumulativeIndex++;
                        const seatId = `${rowCumulativeIndex + index + 1}`;

                        const isPreBooked =
                          screeningData.occupiedSeats.includes(seatId) || false;
                        //something here is bugging out, first row has seats booked? wth
                        return (
                          <Button
                            onClick={() => handleSeatSelect(seatId)}
                            onMouseOver={() =>
                              displaySeats(
                                Number(row),
                                rowCumulativeIndex + index
                              )
                            }
                            key={cumulativeIndex}
                            className={`seat ${
                              isPreBooked ? "booked-seat" : ""
                            } ${
                              hoveredSeats.includes(seatId)
                                ? "hovered-seat"
                                : ""
                            } ${
                              selectedSeats.includes(seatId)
                                ? "seat-selected"
                                : ""
                            }`}
                            variant=""
                          />
                        );
                      })
                      .reverse()}
                  </div>
                </div>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
      <footer className="d-flex justify-content-center align-items-center container booking-summary flex-row justify-content-around ">
        <div>
          <Form method="post">
            <input
              type="hidden"
              name="screeningId"
              value={screeningData.screeningId}
            />
            <input
              className="m-2"
              type="text"
              name="email"
              value={email}
              id=""
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-post"
            />
            <input
              type="hidden"
              name="seats"
              value={JSON.stringify(selectedSeats)}
            />
            <input type="hidden" name="ticketTypes" value={selectedSeats} />

            <Button type="submit" className="booking-btn">
              <h5 className="m-1">Boka</h5>
            </Button>
          </Form>
        </div>
      </footer>
    </>
  );
}
