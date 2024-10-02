import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import './Register.css'; // Optional: Create a CSS file for custom styles

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProps {
  onLogin: () => void; // Add this prop to trigger login state
}

const Register = ({ onLogin }: RegisterProps) => {
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    postalCode: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation, if necessary

    if (formData.password !== formData.confirmPassword) {
      alert('Lösenord och bekräfta lösenord matchar inte.');
      return;
    }

    // Mock registration success
    alert('Du har blivit medlem, välkommen till Filmvisarna');
    onLogin(); // Trigger the logged-in state change

    // Optionally, navigate to a different page after successful registration
    navigate('/'); // Redirect to some dashboard or homepage after registration
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Bli Medlem</h2>
          <p className="text-center mb-4">
            Skapa ett konto på Filmvisarna.se och få full kontroll över dina biobesök och biljetter. Om du också väljer att ta emot nyhetsbrev och inbjudningar, kommer du aldrig att missa ett fantastiskt erbjudande eller spännande förhandsvisningar.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* New Fields Section */}
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>Förnamn</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ange ditt förnamn"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Efternamn</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ange ditt efternamn"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* New Row for Phone Number */}
            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Telefonnummer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ange ditt telefonnummer"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

          {/* New Row for Password and Confirm Password */}
            <Row className="mb-3">
              <Col xs={6} className="position-relative">
                <Form.Group controlId="formPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'} // Toggle visibility
                    placeholder="Ange ditt lösenord"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '35%' }}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </Form.Group>
              </Col>
              <Col xs={6} className="position-relative">
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Bekräfta lösenord</Form.Label>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'} // Toggle visibility
                    placeholder="Bekräfta ditt lösenord"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '35%' }}
                  >
                    {showConfirmPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </Form.Group>
              </Col>
            </Row>

            {/* Existing Fields Section for Email */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>E-postadress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ange din e-postadress"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Checkboxes Section in a Column */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    Jag har läst och accepterat{' '}
                    <Link to="/integrity-policy" className="text-primary" style={{ textDecoration: 'underline' }}>
                      integritets och cookie policy
                    </Link>
                  </>
                }
                required
              />
              <Form.Check
                type="checkbox"
                label="Jag vill gärna få inbjudningar till premiärer, nyheter och erbjudanden, och kan närsomhelst återkalla mitt samtycke."
                className="mt-2" // Add margin-top for spacing
              />
            </Form.Group>

            {/* Button Section */}
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="btn-md register-button">
                Registrera
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
