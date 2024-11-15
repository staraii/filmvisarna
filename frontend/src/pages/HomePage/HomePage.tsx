import { useState } from "react";
import "./home-page.css";
import ScreeningCard from "./ScreeningCard/ScreeningCard";
import MovieCarousel from "./MovieCarousel/MovieCarousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Footer from "../../components/Footer/Footer";
import { useLoaderData } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DualQueryParams, loaderQuery, HomePageMovies, HomePageScreenings } from "../../utils/queryService";
import ScreeningFilters from "./ScreeningFilters/ScreeningFilters";
import useGetInfinite from "../../services/useGetInfinite";
import { Fragment } from "react";


export type ScreeningFiltersState = {
  date: string;
  dateString: string | null;
  age: string;
  theatre: number[];
  urlPrefix: string;
  filteredQuery: string;
  limit: string;
}


export default function HomePage() {
  // Get query parameters from route loader
  const { queryParamsOne, queryParamsTwo } = useLoaderData() as DualQueryParams;

  // State for handling query filters and parsing query url
  const [filters, setFilters] = useState<ScreeningFiltersState>({
    date: "ALL",
    dateString: null,
    age: "ALL",
    theatre: [],
    urlPrefix: queryParamsTwo.query,
    filteredQuery: `${queryParamsTwo.query}?dateTime>=${new Date().toLocaleString("sv-SE")}`,
    limit: "12",
  });

  // moviesData prefetched before route is rendered
  const { data: moviesData } = useSuspenseQuery(loaderQuery(queryParamsOne));

  // Typed array of data to use

  const movies: HomePageMovies[] = moviesData;

  // useGetInfinite - infinite query hook
  const {
    status,
    data: screenings,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetInfinite({
    queryKey: ["homePageScreenings", filters.filteredQuery],
    url: filters.filteredQuery,
    pageSize: 12,
  });


  // Setting filter options, reparsing query url and refetching data
  const handleFilterChange = (
    type: string,
    value: string | number[],
    dateString: string | null
  ) => {
    let newFilters = { ...filters, [`${type}`]: value, dateString };
    const getParsedFilterQuery = () => {
      const filtersList = [];
      let filterQuery = filters.urlPrefix;
      filterQuery += newFilters.date === "ALL" ? `?dateTime>=${new Date().toLocaleString("sv-SE")}` : `?date=${newFilters.date}`;
      if (
        newFilters.age === "ALL" &&
        newFilters.theatre.length === 0
      ) {
        return filterQuery
      }
      if (newFilters.age !== "ALL") {
        filtersList.push(`ageRating<=${newFilters.age}`);
      }
      if (newFilters.theatre.length === 1) {
        filtersList.push(
          `theatreName=${
            newFilters.theatre[0] === 1 ? "Stora+Salongen" : "Lilla+Salongen"
          }`
        );
      }
      if (filtersList.length > 0) {
        filterQuery +=
          "&" +
          `${filtersList.length > 1 ? filtersList.join("&") : filtersList[0]}`;
      }
      return filterQuery;
    };
    const newFilterQuery = getParsedFilterQuery();
    console.log(newFilterQuery)
    newFilters = { ...newFilters, filteredQuery: newFilterQuery };
    setFilters(newFilters);
    //refetch();
  };
  return (
    <section className="home-section pb-xs-5">
      <main className="home_main">
        <MovieCarousel movies={movies} />
        <Container fluid className="position-relative mt-5 pt-3 pb-5">
          {/* Filters Section */}
          <ScreeningFilters
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
          {/* Upcoming Screenings Section */}
          <Row className="mb-5">
            <h3>
              {filters.dateString ? filters.dateString : "Kommande visningar"}
            </h3>
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
            {error && !screenings && (
              <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <p className="w-100 text-center">Kunde inte hitta några visningar</p>
              </Col>
            )}
            {status === "pending" && <p>Hämtar...</p>}
            {screenings &&
              screenings.pages &&
              screenings.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                  {page.map((screening: HomePageScreenings) => (
                    <ScreeningCard key={screening.screeningId} {...screening} />
                  ))}
                </Fragment>
              ))}
          </Row>
          <Row>
            <Col sm={12}>
              {screenings &&
                !(
                  screenings.pages[screenings.pages.length - 1].length < 12
                ) && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? "Laddar..."
                      : hasNextPage
                      ? "Visa fler"
                      : "Inge fler att visa"}
                  </Button>
                )}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </section>
  );
}
