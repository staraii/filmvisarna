import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './LoginMobile.css'; // Custom CSS for additional mobile-specific styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for the checkbox
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Login submitted:", { email, password, rememberMe });
    // Your login logic here (e.g., API call)
    navigate("/"); // Redirect after login
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirect to register page
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password"); // Redirect to forgot password page
  };

  return (
    <Container fluid className="login-page-container">
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={10} md={8} lg={6}>
          <h2 className="text-center mb-4">Logga in</h2>
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

            {/* Checkbox for "Kom ihåg mig" */}
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

            {/* Links for Forgot Password and Register */}
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
    </Container>
  );
};

export default LoginPage;


