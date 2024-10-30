import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useAuth } from '../../utils/authContext'; // Import useAuth to get access to register
import './Register.css';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { register } = useAuth(); // Access register from AuthContext
  const navigate = useNavigate();
  
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Lösenord och bekräfta lösenord matchar inte.');
      return;
    }

    // Log the data being sent
    console.log('Submitting registration data:', formData);

    try {
      // Use the register function from AuthContext to handle registration and authentication
      await register(formData);

      alert('Du har blivit medlem, välkommen till Filmvisarna');
      navigate('/'); // Redirect to the home page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registrering misslyckades: ' + (error as Error).message);
    }
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
            {/* First and Last Name Fields */}
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

            {/* Phone Number Field */}
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

            {/* Password and Confirm Password Fields */}
            <Row className="mb-3">
              <Col xs={6} className="position-relative">
                <Form.Group controlId="formPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
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
                    type={showConfirmPassword ? 'text' : 'password'}
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

            {/* Email Field */}
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

            {/* Policy Agreement Checkboxes */}
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
                className="mt-2"
              />
            </Form.Group>

            {/* Submit Button */}
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




