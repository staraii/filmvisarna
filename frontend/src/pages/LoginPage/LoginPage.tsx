import { useState, FormEvent, ChangeEvent } from "react";
import { Form, Button, Container, Row, Col, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../utils/authContext";
import { Eye, EyeSlash } from "react-bootstrap-icons"; 
import './LoginPage.css';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);

  try {
    // Call the login function and expect to get the email in response
    const response = await login(email, password);
    const { email: userEmail, firstName } = response;

    // set role to user by default
    const role = 'user'; 

    authLogin(userEmail, firstName, role); 
    setShowSuccessModal(true); 
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Inloggningen misslyckades";
    setError(errorMessage);
  }
};

  const handleModalClose = () => {
    setShowSuccessModal(false); 
    navigate("/profil"); 
  };

  return (
    
    <Container fluid className="login-page-container">
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={10} md={8} lg={12}>
          <h2 className="text-center mb-4">Logga in</h2>

          <Form onSubmit={handleSubmit} noValidate>

              {/* Error Alert */}
          <div className="alert-container">
            {error && <div className="alert alert-danger">{error}</div>}
            </div>
            
            {/* Email Field */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ange din e-postadress"
                value={email}
                onChange={handleEmailChange}
                
              />
            </Form.Group>

            

            {/* Password Field with Persistent Eye Toggle */}
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Lösenord</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ange ditt lösenord"
                  value={password}
                  onChange={handlePasswordChange}
                  
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", background: "transparent", borderLeft: "none" }}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Remember Me Checkbox */}
            <Form.Group className="mb-3" controlId="formRememberMe">
              <Form.Check
                type="checkbox"
                label="Kom ihåg mig"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            </Form.Group>

            {/* Login Button */}
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Logga in
            </Button>

            {/* Links to Forgot Password and Register */}
            <div className="text-center">
              <p>
                <span
                  className="login-link"
                  onClick={() => navigate("/forgot-password")}
                >
                  Glömt ditt lösenord?
                </span>{" "}
                |{" "}
                <span
                  className="login-link"
                  onClick={() => navigate("/register")}
                >
                  Bli medlem
                </span>
              </p>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Inloggning lyckades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Du är nu inloggad!</p>
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









