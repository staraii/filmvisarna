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
import { useNavigate } from "react-router-dom";


const movies = [
  {
    title: "Pippi",
    genre: ["Svensk", "Barn"],
    year: "1970",
    slide: "/pippi_slide.jpg",
  },
  {
    title: "Sleepers",
    genre: ["Drama", "Thriller"],
    year: "1996",
    slide: "/sleepers_slide.jpg",
  },
  {
    title: "Titanic",
    genre: ["Drama", "Romantik"],
    year: "1997",
    slide: "/titanic_slide.jpg",
  },
  {
    title: "Fight Club",
    genre: ["Drama"],
    year: "1999",
    slide: "/fight_club_slide.jpg",
  },
  {
    title: "Heat",
    genre: ["Action", "Drama"],
    year: "1995",
    slide: "/heat_slide.jpg",
  }
]


const visningar = [
  {
    title: "Sleepers",
    genre: ["Drama", "Thriller"],
    day: "fre",
    date: "4/10",
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
    title: "Heat",
    genre: ["Action", "Drama"],
    day: "fre",
    date: "4/10",
    time: "21.00",
    theatre: "Stora salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/heat_poster.jpg",
    slide: "/heat_slide.jpg",
    status: "Low",
  },
  {
    title: "Pippi",
    genre: ["Svensk", "Barnfilm"],
    day: "fre",
    date: "4/10",
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
    date: "5/10",
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
    date: "5/10",
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
    date: "5/10",
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
    title: "Fight Club",
    genre: ["Drama"],
    day: "lör",
    date: "5/10",
    time: "21.00",
    theatre: "Lilla salongen",
    lang: "Eng. tal",
    sub: "Sv. text",
    age: "15+",
    img: "/fight_club_poster.jpg",
    slide: "/fight_club_slide.jpg",
    status: "Medium",
  },
  {
    title: "Sleepers",
    genre: ["Drama", "Thriller"],
    day: "sön",
    date: "6/10",
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
    date: "6/10",
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
    date: "6/10",
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
  const navigate = useNavigate();
  const [salong, setSalong] = useState<number[]>([]);
  const handleChangeSalong = (val: number[]) => setSalong(val);

  return (
    <section className="home-section pb-xs-5">
      <main className="home_main">
        {/* Carousel Component */}
        <Carousel interval={5000} className="mb-2">
          {movies.map((movie, index) => (
            <Carousel.Item key={index} onClick={() => navigate("/film")} style={{cursor: "pointer", userSelect: "none"}}>
              <Image src={movie.slide} alt={movie.title} fluid />
              <Carousel.Caption className="h3_film_strip top-50 start-50 translate-middle py-3">
                <h3 className="text-secondary mb-0">{movie.title}</h3>
                <p className="m-auto">{movie.genre.join(", ")}</p>
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