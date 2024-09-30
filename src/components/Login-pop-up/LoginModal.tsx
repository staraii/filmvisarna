
import { LoginModalProps } from '../../utils/Types';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

const LoginModal = ({ show, handleClose }: LoginModalProps) => {
  const navigate = useNavigate();  // Hook to handle navigation

  const handleRegisterClick = () => {
    handleClose(); // Close the modal before navigating
    navigate('/register');  // Navigate to the register page
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logga in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-postadress</Form.Label>
            <Form.Control type="email" placeholder="Ange din e-postadress" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lösenord</Form.Label>
            <Form.Control type="password" placeholder="Ange ditt lösenord" />
          </Form.Group>
          
            {/* Checkbox and Login Button in one row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Check 
              type="checkbox" 
              id="rememberMe" 
              label="Kom ihåg mig" 
            />
            <Button variant="primary" type="submit" className="btn-md">
              Logga in
            </Button>
          </div>

        </Form>

        {/* Text and Register Link Below */}
        <div className="text-center mt-3">
          <p>
             <span className="register-link" onClick={handleRegisterClick}>
              Glömt ditt lösenord?
            </span>
              {" | "}
            <span className="register-link" onClick={handleRegisterClick}>
              Bli medlem
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;