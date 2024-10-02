import "./MovieCalendar.css";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pippi from "../../../public/pippi_poster.jpg";
import Sleepers from "../../../public/sleepers_poster.jpg";
import Titanic from "../../../public/titanic_poster.jpg";

function MovieCalendar() {
  return (
    <section className="Movie-Calendar">
      <div className="Movie-Text">
        <h3>Bio Kalendern</h3>
        <p>Se vilka filmer som går de kommande veckorna.</p>
      </div>
      <div className="Weeks">
        <Carousel slide={false} indicators={false} interval={null} wrap={false}>
          {["Vecka 40", "Vecka 41", "Vecka 42", "Vecka 43"].map(
            (week, index) => (
              <Carousel.Item key={index}>
                <div className="carousel-text">
                  <h3>{week}</h3>
                </div>
              </Carousel.Item>
            )
          )}
        </Carousel>
      </div>
      <div className="Days">
        <Accordion>
          {[
            "Måndag",
            "Tisdag",
            "Onsdag",
            "Torsdag",
            "Fredag",
            "Lördag",
            "Söndag",
          ].map((day, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{day}</Accordion.Header>
              <Accordion.Body>
                <div className="Poster-Container">
                  <div className="Poster-Description">
                    <Card style={{ width: "16rem" }}>
                      <Card.Img variant="top" src={Pippi} />
                      <Card.Body>
                        <Card.Title>Pippi Långstrump (1970)</Card.Title>
                        <div className="Genre-Age">
                          <Card.Text className="Genre">
                            Barnlitteratur
                          </Card.Text>
                          <Card.Text className="Age Age-8">
                            <p>8+</p>
                          </Card.Text>
                        </div>

                        <div className="Time-Button-Container">
                          <Card.Text className="Movie-Time">
                            <p>17:00</p>
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
                  <div className="Poster-Description">
                    <Card style={{ width: "16rem" }}>
                      <Card.Img variant="top" src={Titanic} />
                      <Card.Body>
                        <Card.Title>Titanic (1997)</Card.Title>
                        <div className="Genre-Age">
                          <Card.Text className="Genre">
                            Romantik, Drama
                          </Card.Text>
                          <Card.Text className="Age Age-15">
                            <p>15+</p>
                          </Card.Text>
                        </div>
                        <div className="Time-Button-Container">
                          <Card.Text className="Movie-Time">
                            <p>19:00</p>
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
                  <div className="Poster-Description">
                    <Card style={{ width: "16rem" }}>
                      <Card.Img variant="top" src={Sleepers} />
                      <Card.Body>
                        <Card.Title>Sleepers (1996)</Card.Title>
                        <div className="Genre-Age">
                          <Card.Text className="Genre">
                            Drama, Thriller
                          </Card.Text>
                          <Card.Text className="Age Age-15">
                            <p>15+</p>
                          </Card.Text>
                        </div>

                        <div className="Time-Button-Container">
                          <Card.Text className="Movie-Time">
                            <p>22:00</p>
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
