import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
  onLogin: () => void; // Ensure this prop is passed in
}

const LoginModal = ({ show, handleClose, onLogin }: LoginModalProps) => {
   const navigate = useNavigate(); // Initialize the useNavigate hook
  const handleLogin = () => {
    alert("Du är inloggad"); // Show alert
    onLogin(); // Call the login function passed from App
  };

const handleRegister = () => {
    navigate("/register"); // Navigate to the register page
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logga in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-postadress</Form.Label>
            <Form.Control type="email" placeholder="Ange din e-postadress" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lösenord</Form.Label>
            <Form.Control type="password" placeholder="Ange ditt lösenord" />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Check type="checkbox" id="rememberMe" label="Kom ihåg mig" />
            <Button variant="primary" type="button" onClick={handleLogin}>
              Logga in
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3">
          <p>
            <span className="register-link" onClick={handleClose}>
              Glömt ditt lösenord?
            </span>{" "}
            |{" "}
            <span className="register-link" onClick={handleRegister}>
              Bli medlem
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;


