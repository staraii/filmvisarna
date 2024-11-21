import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Html5QrcodeScanner } from "html5-qrcode";

const BOOKING_NUMBER_REGEX = /^[A-Z]{3}[\d]{3}$/;

interface QrDimensions {
  width: number;
  height: number;
}
type QrDimensionFunction = (viewfinderWidth: number, viewfinderHeight: number) => QrDimensions;

const qrBoxFunction: QrDimensionFunction = function (viewfinderWidth, viewfinderHeight) {
  const minEdgePercentage = 0.9;
  const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
  const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
  return {
    width: qrboxSize,
    height: qrboxSize
  };
}

export default function Tickets() {
  const [payState, setPayState] = useState({bookingNumber: "", touched: false, error: "", isValid: false})

  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (BOOKING_NUMBER_REGEX.test(value.toUpperCase())) {
      setPayState((prevState) => ({ ...prevState, [name]: value.toUpperCase(), error: "", isValid: true }));
    } else {
      setPayState((prevState) => ({ ...prevState, [name]: value.toUpperCase(),  isValid: false }));
    } 
  }

  const handleQrScanner = () => {
    setPayState((prevState) => ({ ...prevState, error: "" }));
    if (scanner) {
      scanner.clear().catch((error) => {
        console.error("Failed to clear qr-scanner ", error);
      });
      setScanner(null);
    } else {
      const newScanner = new Html5QrcodeScanner(
        "reader",
        {
          qrbox: qrBoxFunction,
          fps: 5,
        },
          false
      );
      function success(result: string) {
        if (BOOKING_NUMBER_REGEX.test(result)) {
          handleSubmit(result);
        } else {
          setPayState((prevState) => ({
            ...prevState,
            error: "Felaktig QR-kod",
          }));
          handleQrScanner();
        }
      }

      function error(err: string) {
        console.warn(err);
      }
      setScanner(newScanner);
      newScanner.render(success, error);
    };
  }
  useEffect(() => {

    return () => {
      if (scanner) {
        scanner.clear().catch((error) => {
          console.error("Failed to clear qr-scanner", error);
        });
        setScanner(null);
      }
    }
  },[scanner])

  const handleSubmit = (bookingNumber: string) => {
    navigate(`/admin/bokningar/${bookingNumber}`);
  }
  return (
    <Container fluid className="d-flex flex-column justify-content-around px-5">
      <Row>
        <Col xs={12} md={12} xl={12} className="mt-5 mb-3 pt-5">
          <h3>Biljetter</h3>
        </Col>
      </Row>
      {!scanner && (
        <>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}             className="mx-auto">
              <Form noValidate validated={payState.isValid}>
                <Form.Group>
                  <Form.Label className="my-4">
                    Ange bokningsnummer
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ABC123"
                    className="my-2 border border-secondary"
                    name="bookingNumber"
                    onBlur={() =>
                    setPayState((prevState) => ({
                      ...prevState,
                      touched: true,
                    }))
                    }
                    onChange={handleOnChange}
                    isInvalid={!payState.isValid && payState.touched}
                    value={payState.bookingNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    Giltigt format, ABC123
                  </Form.Control.Feedback>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    className="w-100 my-4"
                    disabled={!payState.isValid}
                    onClick={() => handleSubmit(payState.bookingNumber)}
                  >
                    Nästa
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col className="my-5">
              <p>eller</p>
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col>
          {payState.error !== "" && (
            <p className="text-danger">{payState.error}</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <div id="reader"></div>
        </Col>
      </Row>

      <Row className="d-flex flex-column justify-content-center">
        <Col xs={12} className="mx-auto">
          <Button
            variant="outline-secondary"
            type="button"
            className="w-100 mt-4"
            onClick={handleQrScanner}
          >
            {scanner ? "Tillabaka" : "Skanna QR-kod"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
