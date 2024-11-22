import { useEffect, useState } from "react";
import "./MovieCalendar.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { loaderQuery } from "../../utils/queryService";
import { useLoaderData, useNavigate } from "react-router-dom";
import { QueryParams } from "../../utils/queryService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getWeekday } from "../../utils/dateTimeUtils";

type FullScreening = {
  screeningId: number;
  movieTitle: string;
  dateTime: string;
  dayName: string;
  day: number;
  month: number;
  week: number;
  time: string;
  theatreName: string;
  numberOfSeats: number;
  numberOfOccupiedSeats: number;
  occupiedSeats: string;
  occupiedPercent: number;
  ageRating: number;
  posterURL: string;
};

function MovieCalendar() {
  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const [allMovies, setAllMovies] = useState<FullScreening[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(48);
  const [moviesToDisplay, setMoviesToDisplay] = useState<FullScreening[]>([]);

  useEffect(() => {
    const flatMovies: FullScreening[] = data.flatMap((weeks: any) =>
      weeks.flatMap((days: any) => days)
    );
    setAllMovies(flatMovies);
  }, [data]);

  useEffect(() => {
    if (allMovies.length > 0) {
      const filteredMovies = allMovies.filter(
        (movie) => movie.week === selectedWeek
      );
      setMoviesToDisplay(filteredMovies);
    }
  }, [selectedWeek, allMovies]);

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(Number(event.target.value));
  };

  const navigate = useNavigate();

  const groupedMoviesByDay = moviesToDisplay.reduce((acc, movie) => {
    const translatedDayName = getWeekday(movie.dayName);
    const key = `${translatedDayName}-${movie.day}/${movie.month}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(movie);
    return acc;
  }, {} as Record<string, FullScreening[]>);

  return (
    <section className="Movie-Calendar">
      <div className="Movie-Text">
        <h3>BioKalendern</h3>
        <p>Se vilka filmer som går de kommande veckorna.</p>
      </div>
      <div className="Weeks">
        <label>
          Välj vecka:
          <select value={selectedWeek} onChange={handleWeekChange}>
            {[48, 49, 50].map((week) => (
              <option key={week} value={week}>
                {week}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul>
        {Object.keys(groupedMoviesByDay).length > 0 ? (
          Object.entries(groupedMoviesByDay).map(([dayKey, movies]) => (
            <div className="Days" key={dayKey}>
              <Accordion>
                <Accordion.Item eventKey={dayKey}>
                  <Accordion.Header>
                    {dayKey.replace(/-/g, " ")}
                  </Accordion.Header>
                  <Accordion.Body>
                    {movies.map((movie, index) => (
                      <div className="Movies" key={index}>
                        <Container>
                          <Card style={{ width: "17rem" }}>
                            <Card.Body>
                              <Row className="Row">
                                <Col>
                                  <Card.Img
                                    variant="top"
                                    src={`/images/${movie.posterURL}?url`}
                                  />
                                </Col>
                                <Col>
                                  <Card.Text className="Movie-Description">
                                    <Card.Title className="Movie-Title">
                                      <h4>{movie.movieTitle}</h4>
                                    </Card.Title>
                                    <Card.Text className="Age-Rating">
                                      <p>{movie.ageRating}+</p>
                                    </Card.Text>
                                    <Card.Text className="Movie-Time">
                                      <p>{movie.time}</p>
                                    </Card.Text>
                                    <Button
                                      className="Movie-Button"
                                      variant="outline-primary"
                                      onClick={() =>
                                        navigate(`/boka/${movie.screeningId}`)
                                      }
                                    >
                                      Boka nu
                                    </Button>
                                  </Card.Text>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Container>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))
        ) : (
          <p>No movies available for week {selectedWeek}</p>
        )}
      </ul>
    </section>
  );
}

export default MovieCalendar;
