import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ShowReviewsProps {
  reviewBy: string;
  review: string;
  rating: string;
  index: number;
  removeReview: (revIndex: number) => void;
}

export default function ShowReviews({ reviewBy, review, rating, removeReview, index }: ShowReviewsProps) {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleYes = () => {
    removeReview(index);
    setShowModal(false);
  }
  return (
    <>
      <Row className="px-4 my-4">
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="border border-secondary rounded p-4"
        >
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Row>
                <Col xs={8} sm={10} md={8} lg={10} xl={10} xxl={10}>
                  <p className="text-secondary fw-bold fs-4">
                    Recension {index + 1}
                  </p>
                </Col>
                <Col xs={4} sm={2} md={4} lg={2} xl={2} xxl={2}>
                  <p className="text-secondary fw-bold fs-4">
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Dölj" : "Visa"}
                    </Button>
                  </p>
                </Col>
              </Row>
              {show && (
                <>
                  <Row>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <p className="text-secondary fw-bold">Skriven av: </p>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <p className="fs-5 text-start">{reviewBy}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <p className="text-secondary fw-bold">Betyg: </p>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <p className="fs-5 text-start">{rating}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <p className="text-secondary fw-bold">Recension: </p>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <p className="fs-5 text-start">{review}</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => setShowModal(true)}
                      >
                        Ta bort recension
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>

        <Modal.Body>
          <p className="text-secondary fs-5 text-center">Ta bort Recension {index + 1} ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Nej
          </Button>
          <Button type="button" variant="outline-danger" onClick={handleYes}>
            Ja
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
