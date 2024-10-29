import { useState } from "react";
import "./home-page.css";
import ScreeningCard from "./ScreeningCard/ScreeningCard";
import MovieCarousel from "./MovieCarousel/MovieCarousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Stack from "react-bootstrap/Stack";
import Footer from "../../components/Footer/Footer";
import { useLoaderData } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DualQueryParams, loaderQuery, HomePageMovies, HomePageScreenings } from "../../utils/queryService";


export default function HomePage() {
  const { queryParamsOne, queryParamsTwo } = useLoaderData() as DualQueryParams;
  const { data: moviesData } = useSuspenseQuery(loaderQuery(queryParamsOne));
  const { data: screeningsData } = useSuspenseQuery(
    loaderQuery(queryParamsTwo)
  );
  const movies: HomePageMovies[] = moviesData;
  const screenings: HomePageScreenings[] = screeningsData;
  const [salong, setSalong] = useState<number[]>([]);
  const handleChangeSalong = (val: number[]) => setSalong(val);

  return (
    <section className="home-section pb-xs-5">
      <main className="home_main">
        <MovieCarousel movies={movies} />

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
          <Row
            className="d-flex flex-row flex-wrap mb-5 row-gap-4"
            xs={1}
            sm={2}
            md={2}
            lg={3}
            xl={3}
            xxl={3}
          >
            {screenings.map((screening) => (<ScreeningCard key={screening.screeningId} {...screening} />))}
          </Row>
        </Container>
      </main>

      <Footer />
    </section>
  );
}
