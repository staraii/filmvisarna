import { Row, Col, Container } from "react-bootstrap";

export default function BookingConfirmationPage() {
  return (
    <>
      <h2>Tack för din bokning!</h2>
      <Container className="">
        <Row className="pt-4">
          <Col>
            <h4>Film</h4>
            <h4>Tid</h4>
            <h4>Platser</h4>
            <h4>BokningsId</h4>
          </Col>
          <Col>
            <p className="">Heat</p>
            <p>onsdag 18 sep 21:00-22:43</p>
            <p>12, 13, 14</p>
            <p>FVSS18092024121314</p>
          </Col>
          <p className="pt-4">bokningsbekräftelse kommer snart på eposten</p>
        </Row>
      </Container>
    </>
  );
}
