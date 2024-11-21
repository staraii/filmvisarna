import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { TextInputParams } from "../../../AdminTypes";

interface TextInputProps {
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTouched: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  params: TextInputParams;
}
export default function TextInput({ value, handleOnChange, handleTouched, isInvalid, params }: TextInputProps) {

  if (params.type === "textarea") {
    return (
      <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Form.Floating className="text-secondary">
          <Form.Control
            id={params.controlId}
            as="textarea"
            placeholder={params.label}
            value={value}
            name={params.name}
            onChange={handleOnChange}
            isInvalid={isInvalid}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleTouched(e)}
            className="rows-5 border-secondary"
            style={{ resize: "none", height: "7rem" }}
            size="sm"
          />
          <label htmlFor={params.controlId}>{params.label}</label>
          <Form.Control.Feedback type="invalid">
            {params.feedback}
          </Form.Control.Feedback>
        </Form.Floating>
      </Col>
    );
  }

  return (
    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
      <Form.Floating className="text-secondary w-100">
        <Form.Control
          id={params.controlId}
          type={params.type}
          placeholder={params.name === "trailerURL" ? "" : params.label}
          value={value}
          name={params.name}
          onChange={handleOnChange}
          isInvalid={isInvalid}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleTouched(e)}
          size="sm"
          className="border-secondary"
        />
        <label htmlFor={params.controlId} className="text-wrap">{params.label}</label>
        <Form.Control.Feedback type="invalid">{params.feedback}</Form.Control.Feedback>
      </Form.Floating>
    </Col>
  );
}