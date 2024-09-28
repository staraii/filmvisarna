import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Register.css'; // Optional: Create a CSS file for custom styles

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  email: string;
  password: string;
  confirmPassword: string; // Added this to handle confirmPassword input
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    postalCode: '',
    email: '',
    password: '',
    confirmPassword: '', // Initialize with empty string
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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

            {/* New Row for Phone Number and Postal Code */}
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
              <Col xs={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ange ditt lösenord"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Bekräfta lösenord</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Bekräfta ditt lösenord"
                    name="confirmPassword"
                    value={formData.confirmPassword}  // Bind the value to the state
                    onChange={handleChange}
                    required
                  />
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
              <Button variant="primary" type="submit" className="btn-md">
                Registera
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
