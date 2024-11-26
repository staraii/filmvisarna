import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface SelectAgeRatingProps {
  ageRating: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isInvalid: boolean;
  handleTouched: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function SelectAgeRating({ageRating, onChangeHandler, isInvalid, handleTouched}: SelectAgeRatingProps) {
  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="my-3">
      <p className="movieform-label">Åldersgräns</p>
      <Form.Select
        aria-label="Välj åldersgräns"
        value={ageRating}
        name="ageRating"
        onChange={onChangeHandler}
        className="border border-secondary text-secondary"
        isInvalid={isInvalid}
        onBlur={handleTouched}
      >
        <option value="">Välj åldersgräns</option>
        <option value="1">Barntillåten</option>
        <option value="7">Från 7 år</option>
        <option value="11">Från 11 år</option>
        <option value="15">Från 15 år</option>
      </Form.Select>
    </Col>
  );
}