import { useState } from "react";
import "./home-page.css";
import ScreeningCard from "./ScreeningCard/ScreeningCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";


const visningar = [
  {
    title: "Titanic",
    genre: ["Drama", "Romantik"],
    day: "fre",
    date: "20/9",
    time: "17.00",
    theatre: "Stora salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/titanic_poster.jpg",
    slide: "/titanic_slide.jpg",
    status: "Low",
  },
  {
    title: "Sleepers",
    genre: ["Drama", "Thriller"],
    day: "fre",
    date: "20/9",
    time: "19.00",
    theatre: "Lilla salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/sleepers_poster.jpg",
    slide: "/sleepers_slide.jpg",
    status: "Medium",
  },
  {
    title: "Pippi",
    genre: ["Svensk", "Barnfilm"],
    day: "fre",
    date: "20/9",
    time: "21.00",
    theatre: "Lilla salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "8+",
    img: "/pippi_poster.jpg",
    slide: "/pippi_slide.jpg",
    status: "Medium",
  },
  {
    title: "Pippi",
    genre: ["Svensk", "Barnfilm"],
    day: "lör",
    date: "21/9",
    time: "15.00",
    theatre: "Stora salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "8+",
    img: "/pippi_poster.jpg",
    slide: "/pippi_slide.jpg",
    status: "Many",
  },
  {
    title: "Titanic",
    genre: ["Drama", "Romantik"],
    day: "lör",
    date: "21/9",
    time: "19.00",
    theatre: "Lilla salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/titanic_poster.jpg",
    slide: "/titanic_slide.jpg",
    status: "Many",
  },
  {
    title: "Sleepers",
    genre: ["Drama", "Thriller"],
    day: "lör",
    date: "20/9",
    time: "21.00",
    theatre: "Stora salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/sleepers_poster.jpg",
    slide: "/sleepers_slide.jpg",
    status: "Low",
  },
  {
    title: "Sleepers",
    genre: ["Drama", "Thriller"],
    day: "sön",
    date: "21/9",
    time: "15.00",
    theatre: "Lilla salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/sleepers_poster.jpg",
    slide: "/sleepers_slide.jpg",
    status: "Many",
  },
  {
    title: "Pippi",
    genre: ["Svensk", "Barnfilm"],
    day: "sön",
    date: "22/9",
    time: "17.00",
    theatre: "Stora salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "8+",
    img: "/pippi_poster.jpg",
    slide: "/pippi_slide.jpg",
    status: "Low",
  },
  {
    title: "Titanic",
    genre: ["Drama", "Romantik"],
    day: "sön",
    date: "21/9",
    time: "19.00",
    theatre: "Stora salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/titanic_poster.jpg",
    slide: "/titanic_slide.jpg",
    status: "Low",
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
          <Container fluid>
            <Row
              className="d-flex flex-row flex-wrap mb-5 row-gap-4"
              xs={1}
              sm={2}
              md={2}
              lg={3}
              xl={3}
              xxl={3}
            >
                {visningar.map((v, vIndex) => (
                        <ScreeningCard key={vIndex} {...v} />
                ))}
            </Row>
          </Container>
        </Container>
      </main>
    </section>
  );
}
