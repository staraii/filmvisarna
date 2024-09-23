import "./bookingPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";

export default function BookingPage() {
  const [showMenu, setShowMenu] = useState(true);
  const seats = {
    "1": 8,
    "2": 9,
    "3": 10,
    "4": 10,
    "5": 10,
    "6": 10,
    "7": 12,
    "8": 12,
  };
  let selectedTickets = 2;

  const seatGrid = Object.entries(seats).map(([row, seatCount]) => (
    <div key={row} className="seat-row">
      <h4>Row {row}</h4>
      <div className="seat-grid">
        {Array.from({ length: seatCount }).map((_, index) => (
          <button key={index} className="seat">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  ));

  return (
    <>
      <Navbar
        fixed="top"
        bg="primary"
        className="navbar-bottom"
        style={showMenu ? { height: "16vh" } : {}}
      >
        <Container className="flex-column">
          {showMenu ? (
            <Row xs={3} md={3} lg={3} className="navbar-row">
              <Col>
                <Nav.Link href="#login">Logga in</Nav.Link>
              </Col>
              <Col>
                <Nav.Link href="#blimedlem">Bli medlem</Nav.Link>
              </Col>
              <Col>
                <Nav.Link href="#avboka">Avboka platser</Nav.Link>
              </Col>
            </Row>
          ) : null}
          <Row xs={3} md={3} lg={3} className="navbar-row">
            <Col>
              <Nav.Link href="#home">Hem</Nav.Link>
            </Col>
            <Col>
              <Nav.Link href="#filmer">Filmer</Nav.Link>
            </Col>
            <Col>
              <button
                type="button"
                onClick={() => setShowMenu((showMenu) => !showMenu)}
              >
                Meny
              </button>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <body className="body h-auto d-flex flex-column container">
        <div class="container text-center booking-header">
          <div class="row">
            <div class="col">
              <h1 class="pt-5">Heat</h1>
            </div>
            <span class="col"></span>
            <div class="col">
              <p>onsdag 18 sep</p>
              <p>21:00-22:43</p>
              <p>(Sv.text) (Eng.tal)</p>
              <p>12+</p>
            </div>
          </div>
        </div>
        <div class="d-flex w-100 justify-content-center">
          <section class=" bg-white row w-25">
            <button class="col">+</button>
            <p class="col text-black">2</p>
            <button class="col">-</button>
          </section>
          <section class="container bg-white w-50 row">
            <div class="border-2 border-black"></div>
          </section>
        </div>

        <div class="w-100 h-100 bg-black p-3 d-flex flex-column">
          <h4>Stora salongen</h4>
          <div
            class="d-flex align-items-center flex-row justify-content-center"
            className="seat-container"
          >
            {seatGrid}
          </div>
        </div>
      </body>
      <footer class="d-flex w-100 justify-content-center align-items-center container booking-header flex-row justify-content-around">
        <h4>Order:</h4>
        <span>
          <p>Biljetter: 2</p>
          <p>Platser: 22, 23</p>
          <p>Att betala: 300 kr</p>
        </span>
        <button>Boka</button>
      </footer>
    </>
  );
}
