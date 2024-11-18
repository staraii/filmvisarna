import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface SelectAgeRatingProps {
  ageRating: string;
  handleAgeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectAgeRating({ageRating, handleAgeChange}: SelectAgeRatingProps) {
  const [touched, setTouched] = useState(false);

  return (
    // <Row>
      <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <p className="movieform-label">Åldersgräns</p>
        <Form.Select
          aria-label="Välj åldersgräns"
          value={ageRating}
          onChange={(e) => handleAgeChange(e)}
          className="border border-secondary text-secondary"
          isInvalid={ageRating === "" && touched}
          onBlur={() => setTouched(true)}
        >
          <option value="">Välj åldersgräns</option>
          <option value="1">Barntillåten</option>
          <option value="7">Från 7 år</option>
          <option value="11">Från 11 år</option>
          <option value="15">Från 15 år</option>
        </Form.Select>
      </Col>
    // </Row>
  );
}