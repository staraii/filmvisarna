import { useState } from "react";
import "./home-page.css";
import ScreeningCard from "./ScreeningCard/ScreeningCard";
import MovieCarousel from "./MovieCarousel/MovieCarousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Footer from "../../components/Footer/Footer";
import { useLoaderData } from "react-router-dom";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { DualQueryParams, loaderQuery, HomePageMovies, HomePageScreenings, getQueryData } from "../../utils/queryService";
import ScreeningFilters from "./ScreeningFilters/ScreeningFilters";


export default function HomePage() {
  // Get query parameters from route loader
  const { queryParamsOne, queryParamsTwo } = useLoaderData() as DualQueryParams;
  
  // State for handling query filters and parsing query url
  const [filters, setFilters] = useState({ date: "ALL", age: "ALL", theatre: [], urlPrefix: queryParamsTwo.query, filteredQuery: queryParamsTwo.query });
  
  // moviesData prefetched before route is rendered
  const { data: moviesData } = useSuspenseQuery(loaderQuery(queryParamsOne));

  // screeningsData fetched after component is rendered, depending on filteredQuery string
  const { data: screeningsData, refetch, isPending, error } = useQuery({ queryKey: [queryParamsTwo.queryName, filters.filteredQuery], queryFn: () => getQueryData(filters.filteredQuery), enabled: !!filters.filteredQuery });

  // Arrays of data to use
  const movies: HomePageMovies[] = moviesData;
  const screenings: HomePageScreenings[] = screeningsData;

  // Setting filter options, reparsing query url and refetching data
  const handleFilterChange = (type: string, value: string | number[]) => {
    let newFilters = { ...filters, [`${type}`]: value };

    const getParsedFilterQuery = () => {
      const filtersList = [];
      let filterQuery = filters.urlPrefix;
      if (newFilters.date === "ALL" && newFilters.age === "ALL" && newFilters.theatre.length === 0) {
        return filterQuery;
      }
      if (newFilters.date !== "ALL") {
        filtersList.push(`date=${newFilters.date}`)
      }
      if (newFilters.age !== "ALL") {
        filtersList.push(`ageRating<=${newFilters.age}`);
      }
      if (newFilters.theatre.length === 1) {
        filtersList.push(`theatreName=${newFilters.theatre[0] === 1 ? "Stora+Salongen" : "Lilla+Salongen"}`);
      }
      if (filtersList.length > 0) {
        filterQuery += "?" + `${filtersList.length > 1 ? filtersList.join("&") : filtersList[0]}`;
      }
      return filterQuery
    }
    const newFilterQuery = getParsedFilterQuery();
    newFilters = {...newFilters, filteredQuery: newFilterQuery}
    setFilters(newFilters);
    refetch();
  }
  return (
    <section className="home-section pb-xs-5">
      <main className="home_main">
        <MovieCarousel movies={movies} />
        <Container fluid className="position-relative mt-5 pt-3 pb-5">
          {/* Filters Section */}
          <ScreeningFilters filters={filters} handleFilterChange={handleFilterChange} />
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
            {isPending && (<p>Hämtar visningar...</p>)}
            {error && !screenings && (<p>Kunde inte hitta några visningar</p>)}
            {screenings && screenings.map((screening) => (
              <ScreeningCard key={screening.screeningId} {...screening} />
            ))}
          </Row>
        </Container>
      </main>
      <Footer />
    </section>
  );
}