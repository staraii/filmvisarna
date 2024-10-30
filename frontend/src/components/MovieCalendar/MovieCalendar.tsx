import { useState } from "react";
import "./MovieCalendar.css";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pippi from "../../../public/pippi_poster.jpg";
import Sleepers from "../../../public/sleepers_poster.jpg";
import Titanic from "../../../public/titanic_poster.jpg";
import { useSuspenseQuery } from "@tanstack/react-query";
import { loaderQuery } from "../../utils/queryService";
import { useLoaderData } from "react-router-dom";
import { QueryParams } from "../../utils/queryService";

function MovieCalendar() {
  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const [activeWeekIndex, setActiveWeekIndex] = useState(0); // State för att hålla koll på aktiv vecka

  console.log(data);
  /*
  const weeks = [
    { title: "Vecka 40", startDate: "2024-10-01" },
    { title: "Vecka 41", startDate: "2024-10-08" },
    { title: "Vecka 42", startDate: "2024-10-15" },
    { title: "Vecka 43", startDate: "2024-10-22" },
  ];

  // Filmer för varje dag i varje vecka
  const daysData = [
    // Vecka 40
    [
      {
        day: "Måndag - September 30",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Tisdag - Oktober 1",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Onsdag - Oktober 2",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Torsdag - Oktober 3",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Fredag - Oktober 4",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Lördag - Oktober 5",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Söndag - Oktober 6",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
    ],
    // Vecka 41
    [
      {
        day: "Måndag - Oktober 7",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Tisdag - Oktober 8",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Onsdag - Oktober 9",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Torsdag - Oktober 10",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Fredag - Oktober 11",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Lördag - Oktober 12",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Söndag - Oktober 13",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
    ],
    // Vecka 42
    [
      {
        day: "Måndag - Oktober 14",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Tisdag - Oktober 15",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Onsdag - Oktober 16",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Torsdag - Oktober 17",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Fredag - Oktober 18",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Lördag - Oktober 19",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Söndag - Oktober 20",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
    ],
    // Vecka 43
    [
      {
        day: "Måndag - Oktober 21",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Tisdag - Oktober 22",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Onsdag - Oktober 23",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Torsdag - Oktober 24",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
      {
        day: "Fredag - Oktober 25",
        movies: [
          {
            title: "Pippi Långstrump (1970)",
            genre: "Barnlitteratur",
            age: "8+",
            time: "17:00",
            poster: Pippi,
          },
        ],
      },
      {
        day: "Lördag - Oktober 26",
        movies: [
          {
            title: "Titanic (1997)",
            genre: "Romantik, Drama",
            age: "15+",
            time: "19:00",
            poster: Titanic,
          },
        ],
      },
      {
        day: "Söndag - Oktober 27",
        movies: [
          {
            title: "Sleepers (1996)",
            genre: "Drama, Thriller",
            age: "15+",
            time: "22:00",
            poster: Sleepers,
          },
        ],
      },
    ],
  ];

  */

  return (
    <section className="Movie-Calendar">
      <div className="Movie-Text">
        <h3>Bio Kalendern</h3>
        <p>Se vilka filmer som går de kommande veckorna.</p>
      </div>
      <div className="Weeks">
        <Carousel
          slide={false}
          indicators={false}
          interval={null}
          wrap={false}
          activeIndex={activeWeekIndex}
          onSelect={(selectedIndex) => setActiveWeekIndex(selectedIndex)}
        >
          {weeks.map((week, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-text">
                <h3>{week.title}</h3>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="Days">
        <Accordion>
          {daysData[activeWeekIndex].map((dayData, dayIndex) => (
            <Accordion.Item eventKey={dayIndex.toString()} key={dayIndex}>
              <Accordion.Header>{dayData.day}</Accordion.Header>
              <Accordion.Body>
                <div className="Poster-Container">
                  {dayData.movies.map((movie, index) => (
                    <div className="Poster-Description" key={index}>
                      <Card style={{ width: "16rem" }}>
                        <Card.Img variant="top" src={movie.poster} />
                        <Card.Body>
                          <Card.Title>{movie.title}</Card.Title>
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
                              href="/boka"
                            >
                              Boka nu
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default MovieCalendar;
