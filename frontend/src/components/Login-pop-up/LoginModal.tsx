import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useState } from "react"; // Import useState for managing state
import { login } from "../../services/authService"; // Adjust the import path as needed
import "./LoginModal.css"; // Ensure the path is correct

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
  onLogin: () => void; // Ensure this prop is passed in
}

const LoginModal = ({ show, handleClose, onLogin }: LoginModalProps) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // State to manage email, password and error message
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [error, setError] = useState<string>(""); // State for error message

 const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      const data = await login(email, password); // Call the login function

      // You can use the returned data for some purpose
      console.log("Login data:", data); // For example, log the data to the console
      alert("Du är inloggad"); // Show success alert
      onLogin(); // Call the login function passed from App
      handleClose(); // Close the modal
    } catch (err: any) {
      console.error("Error during login:", err);
      setError(err.message || "Inloggningen misslyckades"); // Set error message
    }
};

  const handleRegister = () => {
    navigate("/register"); // Navigate to the register page
    handleClose(); // Close the modal
  };

  const passwordReset = () => {
    navigate("/forgot-password"); // Navigate to the forgot password page
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logga in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-postadress</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Ange din e-postadress" 
              value={email} // Set email state
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lösenord</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Ange ditt lösenord" 
              value={password} // Set password state
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
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
            <span className="register-link" onClick={passwordReset}>
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



