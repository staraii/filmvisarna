import "./CancelTicketsLogin.css";
import Sleepers from "../../../public/sleepers_poster.jpg";
import Heat from "../../../public/heat_poster.jpg";
import Button from "react-bootstrap/Button";

const CancelTicketsLogin = () => {
  return (
    <section className="cancel-ticket-container">
      <div className="header-text">
        <h3>Avboka Biljetter</h3>
      </div>
      <div className="tickets-text">
        <h4>Dina biljetter</h4>
      </div>

      <div className="ticket-wrapper">
        <div className="ticket">
          <div className="ticket-img">
            <img src={Sleepers} alt="" />
          </div>
          <div className="ticket-details">
            <div className="ticket-info">
              <h5>Datum</h5>
              <p>22 Oktober: 18:00</p>
            </div>
            <div className="ticket-info">
              <h5>Bokningsid</h5>
              <p>FVSS18092024</p>
            </div>
            <div className="ticket-info">
              <h5>Platser</h5>
              <p>Rad: 5, Plats: 8,9,10</p>
            </div>
            <div className="ticket-info">
              <Button
                className="cancel-ticket-button"
                variant="outline-primary"
              >
                Avboka
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="ticket-wrapper">
        <div className="ticket">
          <div className="ticket-img">
            <img src={Heat} alt="" />
          </div>
          <div className="ticket-details">
            <div className="ticket-info">
              <h5>Datum</h5>
              <p>29 Oktober: 19:30</p>
            </div>
            <div className="ticket-info">
              <h5>Bokningsid</h5>
              <p>FVSK19192024</p>
            </div>
            <div className="ticket-info">
              <h5>Platser</h5>
              <p>Rad: 8, Plats: 3,4</p>
            </div>
            <div className="ticket-info">
              <Button
                className="cancel-ticket-button"
                variant="outline-primary"
              >
                Avboka
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CancelTicketsLogin;
