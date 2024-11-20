import { useEffect, useState } from "react";
import "./MovieCalendar.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Titanic from "../../../public/titanic_poster.jpg";
import Pippi from "../../../public/pippi_poster.jpg";
import Sleepers from "../../../public/sleepers_poster.jpg";
import { useSuspenseQuery } from "@tanstack/react-query";
import { loaderQuery } from "../../utils/queryService";
import { useLoaderData, useNavigate } from "react-router-dom";
import { QueryParams } from "../../utils/queryService";

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
    const key = `${movie.dayName}-${movie.day}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(movie);
    return acc;
  }, {} as Record<string, FullScreening[]>);

  return (
    <section className="Movie-Calendar">
      <div className="Movie-Text">
        <h3>Bio Kalendern</h3>
        <p>Se vilka filmer som går de kommande veckorna.</p>
      </div>
      <div className="Weeks">
        <label>
          Select Week:
          <select value={selectedWeek} onChange={handleWeekChange}>
            {Array.from({ length: 52 }, (_, i) => (
              <option key={i} value={i + 1}>
                Week {i + 1}
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
                      <div className="Poster-Description" key={index}>
                        <Card style={{ width: "16rem" }}>
                          <Card.Img variant="top" src={movie.poster} />
                          <Card.Body>
                            <Card.Title>{movie.movieTitle}</Card.Title>
                            <div className="Genre-Age">
                              <Card.Text className="Genre">
                                {movie.genre}
                              </Card.Text>
                              <Card.Text className="Age Age-8">
                                <p>{movie.age}</p>
                              </Card.Text>
                            </div>

                            <div className="Time-Button-Container">
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
                            </div>
                          </Card.Body>
                        </Card>
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
