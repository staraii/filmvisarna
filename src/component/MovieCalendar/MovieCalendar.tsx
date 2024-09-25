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
                        <Card.Title>Pippi (1970)</Card.Title>
                        <Card.Text>17:00</Card.Text>
                        <Card.Text>Barn</Card.Text>
                        <Button className="Movie-Button" variant="primary">
                          Boka nu
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="Poster-Description">
                    <Card style={{ width: "16rem" }}>
                      <Card.Img variant="top" src={Titanic} />
                      <Card.Body>
                        <Card.Title>Titanic (1997)</Card.Title>
                        <Card.Text>19:00</Card.Text>
                        <Card.Text>Romantik, Drama</Card.Text>
                        <Button className="Movie-Button" variant="primary">
                          Boka nu
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="Poster-Description">
                    <Card style={{ width: "16rem" }}>
                      <Card.Img variant="top" src={Sleepers} />
                      <Card.Body>
                        <Card.Title>Sleepers (1996)</Card.Title>
                        <Card.Text>22:00</Card.Text>
                        <Card.Text>Drama, Thriller</Card.Text>
                        <Button className="Movie-Button" variant="primary">
                          Boka nu
                        </Button>
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
