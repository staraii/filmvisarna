import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Register.css'; // Optional: Create a CSS file for custom styles

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Combined field for simplicity
  phoneNumber: string;
  postalCode: string;
  email: string;
  password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '', // Use a single date field
    phoneNumber: '',
    postalCode: '',
    email: '',
    password: '',
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
          <h2 className="text-center mb-4">Register</h2>
          <p className="text-center mb-4">
            Create an account at Filmvisarna.se and gain full control over your cinema visits and tickets. If you also opt to receive newsletters and invitations, you'll never miss a great offer or exciting previews.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* New Fields Section */}
           <Row className="mb-3">
        <Col xs={6}>
         <Form.Group controlId="formFirstName">
         <Form.Label>First Name</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter your first name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
    </Form.Group>
   </Col>
      <Col xs={6}>
    <Form.Group controlId="formLastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter your last name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
    </Form.Group>
  </Col>
</Row>

            <Form.Group controlId="formDateOfBirth" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode" className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your postal code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Existing Fields Section */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;