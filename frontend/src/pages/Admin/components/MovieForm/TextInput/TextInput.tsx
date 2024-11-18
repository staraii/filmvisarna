import { useState } from "react";
import Form from "react-bootstrap/Form";
//import FloatingLabel from "react-bootstrap/FloatingLabel";

interface TextInputProps {
  controlId: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
  feedback: string;
  regExp: RegExp;
}
export default function TextInput({ controlId, label, type, placeholder, value, name, handleOnChange, isInvalid, regExp, feedback }: TextInputProps) {
  const [touched, setTouched] = useState(false);

  if (type === "textarea") {
    return (
      <Form.Floating className="text-secondary">
          <Form.Control
            id={controlId}
            as="textarea"
            placeholder={`${placeholder}`}
            defaultValue={value}
            name={name}
            onChange={handleOnChange}
            isInvalid={touched && !regExp.test(value)}
            onBlur={() => setTouched(true)}
            className="rows-5 border-secondary"
            style={{ resize: "none", height: "7rem" }}
            size="sm"
          />
        <label htmlFor={controlId}>{label}</label>
        <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
      </Form.Floating>
    );
  }

  return (
    <Form.Floating className="text-secondary">
      {/* <Form.Label className="align-left">{label}</Form.Label> */}
      <Form.Control
        id={controlId}
        type={type}
        placeholder={`${placeholder}`}
        defaultValue={value}
        name={name}
        onChange={handleOnChange}
        isInvalid={touched && !regExp.test(value)}
        onBlur={() => setTouched(true)}
        size="sm"
        className="border-secondary"
      />
      <label htmlFor={controlId}>{label}</label>
      <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
    </Form.Floating>
  );
}