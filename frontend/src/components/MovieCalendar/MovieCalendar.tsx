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
import { useLoaderData, useNavigate } from "react-router-dom";
import { QueryParams } from "../../utils/queryService";

function MovieCalendar() {
  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const [activeWeekIndex, setActiveWeekIndex] = useState(0); // State för att hålla koll på aktiv vecka
  const navigate = useNavigate();
  console.log(data);

  const weeks = [
    { title: "Vecka 40", startDate: "2024-10-01" },
    { title: "Vecka 41", startDate: "2024-10-08" },
    { title: "Vecka 42", startDate: "2024-10-15" },
    { title: "Vecka 43", startDate: "2024-10-22" },
  ];

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
    ],
  ];

  function book(event) {
    let form = event.target.closest("form");
    let values = {};
    for (let element of form.elements) {
      values[element.name] = element.value;
    }
    console.log(values);
  }

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
                      <form>
                        {" "}
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
                                onClick={() => navigate(´/boka/${movie.screeningId}´) }
                              >
                                Boka nu
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>{" "}
                      </form>
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
