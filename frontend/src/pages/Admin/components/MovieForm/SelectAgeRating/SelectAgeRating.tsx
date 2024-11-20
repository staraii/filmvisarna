import { useState } from "react";
import Form from "react-bootstrap/Form";
//import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface SelectAgeRatingProps {
  ageRating: string;
  //handleAgeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectAgeRating({ageRating, onChangeHandler}: SelectAgeRatingProps) {
  const [touched, setTouched] = useState(false);

  return (
    // <Row>
    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="my-3">
      <p className="movieform-label">Åldersgräns</p>
      <Form.Select
        aria-label="Välj åldersgräns"
        value={ageRating}
        name="ageRating"
        onChange={onChangeHandler}
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