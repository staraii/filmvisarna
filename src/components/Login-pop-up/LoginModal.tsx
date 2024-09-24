
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
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          
          <Button variant="primary" type="submit" className="w-100 mb-3">
            Sign In
          </Button>
        </Form>

        {/* Text and Register Link */}
        <div className="text-center">
          <p>Don't have an account? <span className="register-link" onClick={handleRegisterClick}>Register here</span></p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;