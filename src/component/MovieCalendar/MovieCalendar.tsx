import "./MovieCalendar.css";
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
      <div className="Weeks"></div>
      <div className="Days">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Måndag</Accordion.Header>
            <Accordion.Body>
              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <h4>17:00 - 2h 27m</h4>
                <p>Drama, Thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Titanic} alt="" />
                <h4>19:00 - 3h 14m</h4>
                <p>Romantik, Drama, Historisk</p>
                <p>1997</p>
              </div>

              <div className="Poster-Description">
                <img src={Pippi} alt="" />
                <h4>22:30 - 1h 34m</h4>
                <p>Barn</p>
                <p>1970</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tisdag</Accordion.Header>
            <Accordion.Body>
              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Onsdag</Accordion.Header>
            <Accordion.Body>
              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Torsdag</Accordion.Header>
            <Accordion.Body>
              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Fredag</Accordion.Header>
            <Accordion.Body>
              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Lördag</Accordion.Header>
            <Accordion.Body>
              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>Söndag</Accordion.Header>
            <Accordion.Body>
              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>

              <div className="Poster-Description">
                <img src={Sleepers} alt="" />
                <p>Dramatisk thriller</p>
                <p>1996</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
}
export default MovieCalendar;
