import { useState } from "react";
import "./home-page.css";
//import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";
import MovieCalendar from "../component/MovieCalendar/MovieCalendar";
//import Offcanvas from "react-bootstrap/Offcanvas";

const visningar = [
  {
    title: "Titanic",
    date: "fredag 20/9",
    time: "17.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/titanic_poster.jpg",
  },
  {
    title: "Sleepers",
    date: "fredag 20/9",
    time: "19.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/sleepers_poster.jpg",
  },
  {
    title: "Pippi",
    date: "fredag 20/9",
    time: "21.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "8+",
    img: "/pippi_poster.jpg",
  },
  {
    title: "Pippi",
    date: "lördag 21/9",
    time: "15.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "8+",
    img: "/pippi_poster.jpg",
  },
  {
    title: "Titanic",
    date: "lördag 21/9",
    time: "19.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/titanic_poster.jpg",
  },
  {
    title: "Sleepers",
    date: "lördag 20/9",
    time: "21.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/sleepers_poster.jpg",
  },
  {
    title: "Sleepers",
    date: "söndag 21/9",
    time: "15.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/sleepers_poster.jpg",
  },
  {
    title: "Pippi",
    date: "söndag 22/9",
    time: "17.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "8+",
    img: "/pippi_poster.jpg",
  },
  {
    title: "Titanic",
    date: "söndag 21/9",
    time: "19.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/titanic_poster.jpg",
  },
];

export default function HomePage() {
  const [salong, setSalong] = useState<number[] | []>([]);
  const handleChangeSalong = (val: number[] | []) => setSalong(val);
  const [showMenu, setShowMenu] = useState(true);
  //const handleShowMenu = () => setShowMenu((showMenu) => !showMenu)
  return (
    <section className="home-section">
      <main className="home_main">
        <h1 className="h1_logo my-4">Filmvisarna</h1>
        <Carousel interval={null} className="mb-2">
          <Carousel.Item>
            <Image src="/sleepers_slide.jpg" alt="Sleepers" fluid />
            <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
              <h3 className="text-secondary mb-0">Sleepers</h3>
              <p className="m-auto">Drama thriller (1996)</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="/titanic_slide.jpg" alt="Titanic" fluid />
            <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
              <h3 className="text-secondary mb-0">Titanic</h3>
              <p className="m-auto">Romantiskt drama (1997)</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="/pippi_slide.jpg" fluid />
            <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
              <h3 className="text-secondary mb-0">Pippi Långstrump</h3>
              <p className="m-auto">På de sju haven (1970)</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="/sleepers_slide.jpg" fluid />
            <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
              <h3 className="text-secondary mb-0">Sleepers</h3>
              <p className="m-auto">
                fwivoghdofvdnoig oifj oivj oiwvj oiwvjoiwv j
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src="/sleepers_slide.jpg" fluid />
            <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
              <h3 className="text-secondary mb-0">Sleepers</h3>
              <p className="m-auto">Sleepers</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Container fluid className="position-relative">
          {/* <Row>
          <Col></Col>
        </Row> */}
          {/* <Row className="ms-0 me-0">
          <Col></Col>
        </Row> */}
          <Row className="sticky-top bg-body m-auto top-outline">
            <Row className="mt-3 flex-row justify-content-around bg-body">
              <Col>
                <DropdownButton
                  id="Datum"
                  title="Datum"
                  className="text-secondary"
                >
                  <Dropdown.Item as="button">Fredag 20/9</Dropdown.Item>
                  <Dropdown.Item as="button">Lördag 21/9</Dropdown.Item>
                  <Dropdown.Item as="button">Söndag 21/9</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col>
                <DropdownButton id="Åldergräns" title="Åldergräns">
                  <Dropdown.Item as="button">Barntillåten</Dropdown.Item>
                  <Dropdown.Item as="button">Från 7 år</Dropdown.Item>
                  <Dropdown.Item as="button">Från 11 år</Dropdown.Item>
                  <Dropdown.Item as="button">Från 15 år</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 justify-content-center bg-body">
              <Col>
                <ToggleButtonGroup
                  type="checkbox"
                  value={salong}
                  onChange={handleChangeSalong}
                  className="align-center justify-content-between"
                >
                  <ToggleButton id="tbg-btn-1" value={1}>
                    Stora Salongen
                  </ToggleButton>
                  <ToggleButton id="tbg-btn-2" value={2}>
                    Lilla Salongen
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>
          </Row>

          <Row>
            <Col>Kommande visningar</Col>
          </Row>
          <Row xs={2} sm={3} lg={4}>
            {visningar.map((visning, visIndex) => (
              <Col key={visIndex}>
                <Card>
                  <Card.Img variant="top" src={visning.img} />
                  <Card.Body>
                    {/* <Card.Title>{visning.title}</Card.Title> */}
                    <Card.Text>
                      <p>{visning.date}</p>
                      <p>{visning.time}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
      <Navbar
        fixed="bottom"
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
                <Nav.Link href="#biokalendern">Bio Kalendern</Nav.Link>
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
      {/* <Offcanvas show={showMenu} onHide={() => setShowMenu((showMenu) => !showMenu)} scroll={true} backdrop={true} backdropClassName="customBackdrop" placement="bottom" name="bottom">
        <Offcanvas.Body>
          <p>Avboka platser</p>
          <p>Logga in</p>
          <p>Bli medlem</p>
        </Offcanvas.Body>
      </Offcanvas> */}
    </section>
  );
}
