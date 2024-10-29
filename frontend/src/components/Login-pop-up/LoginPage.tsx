import { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../utils/authContext";
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for the confirmation modal
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      authLogin();
      console.log("Login successful:", data);
      setShowConfirmationModal(true); // Show modal on successful login
    } catch (err: any) {
      console.error("Error during login:", err);
      setError(err.message || "Inloggningen misslyckades");
    }
  };

  const handleModalClose = () => {
    setShowConfirmationModal(false); // Close the modal
    navigate("/profil"); // Navigate to profile after closing modal
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <Container fluid className="login-page-container">
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={10} md={8} lg={8} xl={12}> 
          <h2 className="text-center mb-4">Logga in</h2>
          {error && <div className="alert alert-danger">{error}</div>} 
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ange din e-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ange ditt lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRememberMe">
              <Form.Check 
                type="checkbox" 
                label="Kom ihåg mig" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Logga in
            </Button>

            <div className="text-center">
              <p>
                <span className="login-link" onClick={handleForgotPasswordClick}>
                  Glömt ditt lösenord?
                </span>
                {" | "}
                <span className="login-link" onClick={handleRegisterClick}>
                  Bli medlem
                </span>
              </p>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inloggning lyckades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Du är nu inloggad!.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginPage;



