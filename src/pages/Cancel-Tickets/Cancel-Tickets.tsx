import "./Cancel-Tickets.css";
import React, { useState } from "react"; // Importera useState från React
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CancelTickets() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="Cancel-Tickets">
      <div className="Cancel-Tickets-Text">
        <h3>Avboka Biljetter</h3>
      </div>
      <div className="Input-Fields">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mailadress</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bokningsnummer</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </div>
      <div className="Cancel-Tickets-Button">
        {/* När knappen klickas, visas modalen */}
        <Button variant="primary" onClick={handleShowModal}>
          Avboka
        </Button>
      </div>

      {/* Modal-komponent som visas baserat på state */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Biljetten är avbokad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Din biljett har blivit avbokad. Tack för att du kontaktade oss!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default CancelTickets;
