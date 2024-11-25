import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { useAuth } from '../../utils/authContext'; 
import './Register.css';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;  
}

const Register = () => {
  const { register } = useAuth(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    postalCode: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      // Use the register function from AuthContext to handle registration and authentication
      await register(formData);
      setShowSuccessModal(true); 
    } catch (error) {
      setError('Registrering misslyckades: ' + (error as Error).message);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false); 
    navigate('/profil');
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Bli Medlem</h2>
          <p className="text-center mb-4">
            Skapa ett konto på Filmvisarna.se och få full kontroll över dina biobesök och biljetter. Om du också väljer att ta emot nyhetsbrev och inbjudningar, kommer du aldrig att missa ett fantastiskt erbjudande eller spännande förhandsvisningar.
          </p>

          {/* Error Alert */}
          {error && <div className="alert alert-danger">{error}</div>}

          <Form onSubmit={handleSubmit} noValidate>
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
              />
            </Form.Group>

            {/* Password and Confirm Password Fields */}
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Lösenord</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ange ditt lösenord"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer', background: 'transparent', borderLeft: 'none' }}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Bekräfta lösenord</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Bekräfta lösenord"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <InputGroup.Text
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ cursor: 'pointer', background: 'transparent', borderLeft: 'none' }}
                    >
                      {showConfirmPassword ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
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

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrering lyckades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Välkommen till Filmvisarna! Du har nu skapat ett konto.</p>
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

export default Register;






