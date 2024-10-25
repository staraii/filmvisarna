import  { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import { login } from "../../services/authService"; // Import your existing login function
import { useAuth } from "../../utils/authContext"; // Import AuthContext to manage auth state
import './LoginModal.css';

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal = ({ show, handleClose }: LoginModalProps) => {
  const navigate = useNavigate(); 
  const { login: authLogin } = useAuth(); // Get the login function from AuthContext
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [error, setError] = useState<string>(""); 

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      // Call your authService's login function
      const data = await login(email, password); // Use your existing login function

      // If login is successful, call the context's login function to update the state
      authLogin(); // This will trigger a state change and should update the navbar

      console.log("Login successful:", data); 
      alert("Du är inloggad"); // Alert user of successful login
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
        {error && <div className="alert alert-danger">{error}</div>} 
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-postadress</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Ange din e-postadress" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lösenord</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Ange ditt lösenord" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
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
            </span>{" "}|{" "}
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





