import React from "react";
import { Form, Button } from "react-bootstrap";
import "./passwordReset.css";


const PasswordReset = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add logic to handle password reset here, e.g., send an email
    alert("E-postadress har skickats för återställning."); // Example alert
  };

  return (
    <div className="password-reset-container" >
      <h2 className="text-center">Återställt lösenord</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
           <Form.Label className="form-label">E-postadress</Form.Label> {/* Label with class for CSS */}
          <Form.Control type="email" placeholder="Ange din e-postadress" required />
        </Form.Group>
          {/* Instruction text below the input field */}
      <p className="instruction-text">
        Instruktioner om hur du återställer ditt lösenord kommer skickas till din registrerade e-postadress.
      </p>
          <div className="button-container"> {/* New wrapper for the button */}
          <Button 
            variant="primary" 
            type="submit" 
            className="btn-submit"
          >
            Skicka
          </Button>
        </div>
      </Form>
      
    </div>
  );
};

export default PasswordReset;
