import "./bookingPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";

export default function BookingPage() {
  const [showMenu, setShowMenu] = useState(true);

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
      <body className="body">
        <div className="booking-header">
          <section className="header-section">
            <h1 className="">Heat</h1>
            <h4>Stora Salongen</h4>
          </section>
          <div>
            <p>onsdag 13/9</p>
            <p>21:00 - 23:30</p>
          </div>
          <div>
            <p>(Sv.text) (Eng.tal)</p>
            <p>12+</p>
          </div>
        </div>
      </body>
    </>
  );
}
