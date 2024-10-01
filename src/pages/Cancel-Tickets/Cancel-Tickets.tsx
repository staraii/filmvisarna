import "./Cancel-Tickets.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CancelTickets() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowErrorModal = () => setShowErrorModal(true);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    if (!emailPattern.test(email)) {
      handleShowErrorModal();
    } else {
      handleShowModal();
    }
  };

  return (
    <section className="Cancel-Tickets">
      <div className="Cancel-Tickets-Text">
        <h3>Avboka Biljetter</h3>
      </div>
      <div className="Input-Fields">
        <Form onSubmit={handleSubmit}>
          {" "}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mailadress</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={handleEmailChange}
              className="Custom-Input"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bokningsnummer</Form.Label>
            <Form.Control as="textarea" rows={3} className="Custom-Input" />
          </Form.Group>
          <div className="Cancel-Tickets-Button">
            <Button variant="primary" type="submit">
              {" "}
              Avboka
            </Button>
          </div>
        </Form>
      </div>

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

      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Felaktig Mailadress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vänligen ange en giltig mailadress som slutar på @gmail.com,
            @hotmail.com eller @outlook.com.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default CancelTickets;
