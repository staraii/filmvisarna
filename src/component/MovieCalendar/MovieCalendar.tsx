import "./MovieCalendar.css";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
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
                    <img src={Sleepers} alt="Sleepers" />
                    <h4>17:00 - 2t 27m</h4>
                    <p>Drama, Thriller</p>
                    <p>1996</p>
                  </div>
                  <div className="Poster-Description">
                    <img src={Titanic} alt="Titanic" />
                    <h4>19:00 - 3t 14m</h4>
                    <p>Romantik, Drama, Historisk</p>
                    <p>1997</p>
                  </div>
                  <div className="Poster-Description">
                    <img src={Pippi} alt="Pippi" />
                    <h4>22:30 - 1t 34m</h4>
                    <p>Barn</p>
                    <p>1970</p>
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
