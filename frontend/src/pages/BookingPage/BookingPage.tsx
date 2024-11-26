import "./bookingPage.css";
import { Row, Col, Stack, Button, FormGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import InputForm from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import {
  useNavigate,
  useLoaderData,
  Form,
  useActionData,
} from "react-router-dom";
import { loaderQuery, QueryParams } from "../../utils/queryService";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeekday } from "../../utils/dateTimeUtils";
import { useAuth } from "../../utils/authContext";
import { getParsedYearDateTime } from "../../utils/dateTimeUtils";
import useLocationTitle from "../../utils/useLocationTitle";

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
  email?: string;
  error?: string;
}

export default function BookingPage() {
  const { userEmail, isAuthenticated } = useAuth();
  const [ticketAdult, setticketAdult] = useState<number>(2);
  const [ticketChild, setTicketChild] = useState<number>(0);
  const [ticketSenior, setTicketSenior] = useState<number>(0);
  const [tickets, setTickets] = useState<number>(2);
  const [selectedSeats, setSelectedSeat] = useState<string[]>([]);
  const [hoveredSeats, setHoveredSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Seats>({});
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //react easier state add?

  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const screeningData = data["success"][0];
  const actionData = useActionData() as BookingActionData;
  const navigate = useNavigate();

  const [seatData, setData] = useState<string[]>([]);
  useLocationTitle(screeningData.movieTitle);
  useEffect(() => {
    const date = new Date().toLocaleString();
    const currentTime = getParsedYearDateTime(date);
    const screeningTime = getParsedYearDateTime(screeningData.dateTime);

    const currentDateObj = new Date(
      currentTime.year,
      Number(currentTime.month) - 1,
      Number(currentTime.date),
      parseInt(currentTime.time.split(":")[0], 10),
      parseInt(currentTime.time.split(":")[1], 10)
    );

    const screeningDateObj = new Date(
      screeningTime.year,
      Number(screeningTime.month) - 1,
      Number(screeningTime.date),
      parseInt(screeningTime.time.split(":")[0], 10),
      parseInt(screeningTime.time.split(":")[1], 10)
    );

    if (currentDateObj > screeningDateObj) {
      throw new Error("Åtkomst nekas");
    }
  }, []);

  useEffect(() => {
    const evtSource = new EventSource(
      `/api/events/${screeningData.screeningId}`
    );
    evtSource.onmessage = (event) => {
      if (event.data) {
        const parsedData = JSON.parse(event.data) as Array<{
          seats: string | null;
        }>;

        const updatedOccupiedSeats = parsedData
          .filter((seatEntry) => seatEntry.seats !== null)
          .flatMap((seatEntry) =>
            seatEntry.seats!.split(",").map((seat) => seat.trim())
          );

        setData(updatedOccupiedSeats);
      }
    };
    evtSource.onerror = () => {
      console.error(Error, "Failed to connect to SSE");
      evtSource.close();
    };
    return () => {
      evtSource.close();
    };
  }, []);

  //nullchecks
  if (screeningData.occupiedSeats === null) screeningData.occupiedSeats = "0";

  if (seatData?.length) {
    for (let i = 0; i < seatData.length, i++; ) {
      if (seatData[i] === null) seatData[i] = "";
    }
  }
  //nullchecks

  const occupiedSeatArray = seatData
    ? seatData.map((seat) => seat.trim())
    : screeningData.occupiedSeats;

  useEffect(() => {
    window.scrollTo({
      top: 180,
      left: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (actionData?.bookingSuccess) {
            navigate(
              `/boka/${screeningData.screeningId}/order-bekraftelse/${actionData.bookingNumber}/${actionData.email}`,
              { state: { email } }
            );
    } else if (actionData && !actionData.bookingSuccess) {
      handleShow();
      setSelectedSeat([]);
      setHoveredSeats([]);
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

  // nog skriva om SSE för att passa bättre här, gör detta för sprint 5

  useEffect(() => {
    setTickets(ticketAdult + ticketSenior + ticketChild);
  }, [ticketAdult, ticketSenior, ticketChild]);

  function displaySeats(row: number, index: number) {
    if (!screeningData || !screeningData.occupiedSeats || tickets <= 0) return;

    const rowData = seats[row];
    if (!rowData) return;

    const hoveredSeatIds: string[] = [];

    for (let i = 0; i < tickets; i++) {
      const currentSeatIndex = index + i;

      if (
        currentSeatIndex > rowData.end ||
        currentSeatIndex < rowData.start ||
        occupiedSeatArray.includes(String(currentSeatIndex))
      ) {
        return;
      }
      hoveredSeatIds.push(String(currentSeatIndex));
    }
    setHoveredSeats(hoveredSeatIds);
  }

  let cumulativeIndex = 1;

  function handleSeatSelect() {
    setSelectedSeat(hoveredSeats);
  }

  return (
    <>
      <Stack className="">
        <Stack className="container booking-header justify-content-center">
          <Row className="pt-4">
            <Col>
              {screeningData.movieTitle.length < 15 ? (
                <h1 className="screeningheader">{screeningData.movieTitle}</h1>
              ) : (
                <h3 className="screeningheader">{screeningData.movieTitle} </h3>
              )}
            </Col>
            <Col className="pt-2">
              <h5 className="screeningheader">
                {getWeekday(screeningData.dayName) +
                  " " +
                  screeningData.dateTime.split("T")[0]}
              </h5>
              <h5 className="screeningheader">{screeningData.time}</h5>
            </Col>
            <Col className="pt-2">
              <p>(Sv.text) (Eng.tal)</p>
              <p> 12+</p>
            </Col>
          </Row>
        </Stack>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Något gick fel!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Problem med bokning.</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Stäng
            </Button>
          </Modal.Footer>
        </Modal>

        <Stack className="w-100 h-100 p-3 d-flex flex-column">
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

          <Stack
            gap={4}
            className="seat-container pt-5 mx-auto justify-content-center align-items-center"
          >
            {Object.entries(seats).map(([row, seatData]) => {
              const { seats: seatCount } = seatData as RowSeats;
              const rowCumulativeIndex = cumulativeIndex;

              return (
                <div key={row} className="d-flex flex-row-reverse">
                  <div>
                    {Array.from({ length: seatCount })
                      .map((_, index) => {
                        cumulativeIndex++;
                        const seatId = `${rowCumulativeIndex + index}`;

                        const isPreBooked = occupiedSeatArray.includes(
                          String(seatId)
                        );

                        return (
                          <Button
                            onClick={() => handleSeatSelect()}
                            onMouseOver={() =>
                              displaySeats(
                                Number(row),
                                rowCumulativeIndex + index
                              )
                            }
                            onTouchStart={() =>
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

      <footer className="d-flex justify-content-center align-items-center container booking-summary flex-row justify-content-around">
        <Row>
          <Form method="post">
            <input
              type="hidden"
              name="screeningId"
              value={screeningData.screeningId}
            />

            {/* Conditionally render the email input based on authentication */}
            <Row className="">
              {!isAuthenticated ? (
                <Col className="d-flex justify-content-center align-items-center w-100">
                  <FormGroup className="mb-3" controlId="formEmail">
                    <InputForm.Control
                      type="email"
                      placeholder="E-post"
                      value={email}
                      style={{ width: "250px", marginBottom: "2rem" }}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                </Col>
              ) : (
                <Col>
                  <input type="hidden" name="email" value={userEmail ?? ""} />
                </Col>
              )}
              <Col className="">
                <Button
                  type="submit"
                  variant="outline-secondary"
                  className="book-button-screening-card "
                >
                  Boka
                </Button>
              </Col>
            </Row>
            <input
              type="hidden"
              name="seats"
              value={JSON.stringify(selectedSeats)}
            />
            <input
              type="hidden"
              name="ticketTypes"
              value={JSON.stringify({
                ticket1: ticketAdult,
                ticket2: ticketSenior,
                ticket3: ticketChild,
              })}
            />
          </Form>
        </Row>
      </footer>
    </>
  );
}
