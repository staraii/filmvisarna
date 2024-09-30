import { useState } from "react";
import "./home-page.css";
import ScreeningCard from "./ScreeningCard/ScreeningCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import Footer from "../../components/Footer/Footer";

const visningar = [

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
  const [salong, setSalong] = useState<number[]>([]);
  const handleChangeSalong = (val: number[]) => setSalong(val);

  return (
    <section className="home-section">
      <main className="home_main">
        {/* Carousel Component */}
        <Carousel interval={5000} className="mb-2">
          {visningar.map((visning, index) => (
            <Carousel.Item key={index}>
              <Image src={visning.slide} alt={visning.title} fluid />
              <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
                <h3 className="text-secondary mb-0">{visning.title}</h3>
                <p className="m-auto">{visning.genre.join(", ")}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Main Content Area */}
        <Container fluid className="position-relative mt-5 pt-3 pb-5">
          {/* Filters Section */}
          <Row className="sticky-top bg-body top-outline mb-5">
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
                  <Dropdown.Item as="button">Söndag 22/9</Dropdown.Item>
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

              {/* ToggleButtonGroup for Theater Selection */}
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

          {/* Upcoming Screenings Section */}
          <Row className="mb-5">
            <h3>Kommande visningar</h3>
          </Row>
          <Row className="mb-3">
            <Stack direction="horizontal" gap={3}>
              <p className="d-flex flex-row align-items-center gap-2">
                <span className="less-tickets-circle"></span> Färre lediga platser
              </p>
              <p className="d-flex flex-row align-items-center gap-2">
                <span className="sold-out-circle"></span> Utsålt
              </p>
            </Stack>
          </Row>

          {/* Screening Cards using ScreeningCard component */}
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
      </main>

      {/* Footer */}
      <Footer />
    </section>
  );
}