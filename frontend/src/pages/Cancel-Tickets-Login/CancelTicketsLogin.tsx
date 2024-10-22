import React, { useState } from "react";
import "./CancelTicketsLogin.css";
import Sleepers from "../../../public/sleepers_poster.jpg";
import Heat from "../../../public/heat_poster.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CancelTicketsLogin = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Hantera modalens synlighet
  const handleShowModal = (ticketId) => {
    setSelectedTicket(ticketId); // Spara vilken biljett som är vald
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTicket(null); // Återställ vald biljett när modalen stängs
  };

  const handleCancelTicket = () => {
    // Logik för att avboka biljetten (exempelvis ett API-anrop)
    console.log("Biljett avbokad:", selectedTicket);
    handleCloseModal(); // Stäng modalen efter avbokning
  };

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
            <img src={Sleepers} alt="Sleepers Poster" />
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
                onClick={() => handleShowModal("FVSS18092024")} // Klick för att visa modal
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
            <img src={Heat} alt="Heat Poster" />
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
                onClick={() => handleShowModal("FVSK19192024")} // Klick för att visa modal
              >
                Avboka
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta avbokning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Är du säker på att du vill avboka biljetten med bokningsid{" "}
          {selectedTicket}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Avbryt
          </Button>
          <Button variant="primary" onClick={handleCancelTicket}>
            Bekräfta avbokning
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default CancelTicketsLogin;
