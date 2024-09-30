import { useState } from "react";
import "./home-page.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Footer from "../../components/Footer/Footer";

const visningar = [
  {
    title: "Titanic",
    date: "fredag 20/9",
    time: "17.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/titanic_poster.jpg",
    status: "Low"
  },
  {
    title: "Sleepers",
    date: "fredag 20/9",
    time: "19.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/sleepers_poster.jpg",
    status: "Medium"
  },
  {
    title: "Pippi",
    date: "fredag 20/9",
    time: "21.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "8+",
    img: "/pippi_poster.jpg",
    status: "Medium"
  },
  {
    title: "Pippi",
    date: "lördag 21/9",
    time: "15.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "8+",
    img: "/pippi_poster.jpg",
    status: "Many"
  },
  {
    title: "Titanic",
    date: "lördag 21/9",
    time: "19.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/titanic_poster.jpg",
    status: "Many"
  },
  {
    title: "Sleepers",
    date: "lördag 20/9",
    time: "21.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/sleepers_poster.jpg",
    status: "Low"
  },
  {
    title: "Sleepers",
    date: "söndag 21/9",
    time: "15.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/sleepers_poster.jpg",
    status: "Many"
  },
  {
    title: "Pippi",
    date: "söndag 22/9",
    time: "17.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "8+",
    img: "/pippi_poster.jpg",
    status: "Low"
  },
  {
    title: "Titanic",
    date: "söndag 21/9",
    time: "19.00",
    lang: "(Eng. tal)",
    sub: "(Sv. text)",
    age: "15+",
    img: "/titanic_poster.jpg",
    status: "Low"
  },
];



export default function HomePage() {
  const [salong, setSalong] = useState < number[]|[]>([]);
  const handleChangeSalong = (val: number[] | []) => setSalong(val);
  return (
    <section className="home-section">
      <main className="home_main">
        <Carousel interval={5000} className="mb-2">
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

        <Container fluid className="position-relative mt-5 pt-3 pb-5">
          <Row className="sticky-top bg-body top-outline mb-5" fluid>
            <Stack direction="vertical" gap={3} className="py-3">
              <Stack direction="horizontal" gap={3}>
                <DropdownButton
                  id="Datum"
                  title="Datum"
                  className="text-secondary mx-auto"
                  variant="outline-secondary"
                >
                  <Dropdown.Item as="button">Fredag 20/9</Dropdown.Item>
                  <Dropdown.Item as="button">Lördag 21/9</Dropdown.Item>
                  <Dropdown.Item as="button">Söndag 21/9</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  id="Åldergräns"
                  title="Åldergräns"
                  className="mx-auto"
                  variant="outline-secondary"
                >
                  <Dropdown.Item as="button">Barntillåten</Dropdown.Item>
                  <Dropdown.Item as="button">Från 7 år</Dropdown.Item>
                  <Dropdown.Item as="button">Från 11 år</Dropdown.Item>
                  <Dropdown.Item as="button">Från 15 år</Dropdown.Item>
                </DropdownButton>
              </Stack>
              <ToggleButtonGroup
                type="checkbox"
                value={salong}
                onChange={handleChangeSalong}
                className="align-center justify-content-between"
              >
                <ToggleButton
                  id="tbg-btn-1"
                  value={1}
                  variant="outline-secondary"
                >
                  Stora Salongen
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-2"
                  value={2}
                  variant="outline-secondary"
                >
                  Lilla Salongen
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Row>
          <Row className="">
            <Col>Kommande visningar</Col>
          </Row>
          <Row>
            <Stack direction="horizontal" gap={3}>
              <p className="d-flex flex-row align-items-center gap-2">
                <div className="less-tickets-circle"></div>
                Färre lediga platser
              </p>
              <p className="d-flex flex-row align-items-center gap-2">
                <div className="sold-out-circle"></div>
                Utsålt
              </p>
            </Stack>
          </Row>
          <Row xs={2} sm={3} lg={4} className="row-gap-5 pt-5">
            {visningar.map((visning, visIndex) => (
              <Col key={visIndex}>
                <Card
                  border={
                    visning.status === "Low"
                      ? "danger"
                      : visning.status === "Medium"
                      ? "warning"
                      : "secondary"
                  }
                >
                  <Card.Img variant="top" src={visning.img} />
                  <Card.Body>
                    <Card.Text>{visning.date}</Card.Text>
                    <Card.Text>{visning.time}</Card.Text>
                    <Card.Text className="fw-lighter">{visning.age}</Card.Text>
                    <Card.Text className="fw-lighter">
                      {visning.lang}
                      {"  "}
                      {visning.sub}
                    </Card.Text>
                    <Card.Link>
                      <Button>Boka</Button>
                    </Card.Link>
                    <Card.Link>
                      <Button>Info</Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>
        {/* Footer is added here */}
      <Footer />
    </section>
  );
}
