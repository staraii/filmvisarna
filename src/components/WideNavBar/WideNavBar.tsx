import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./wide-navbar.css";
import LoginModal from "../Login-pop-up/LoginModal";

export default function WideNavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginShow = () => setShowLoginModal(true);
  const handleLoginClose = () => setShowLoginModal(false);

   // Function to handle navigation to the register page
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the Register page
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="primary" className="wide-navbar justify-content-around">
        <Nav.Link href="#hem" className="fw-medium">Hem</Nav.Link>
        <Nav.Link href="#filmer" className="fw-medium">Filmer</Nav.Link>
        <Nav.Link href="#visningar" className="fw-medium">Visningar</Nav.Link>
        <Nav.Link href="#avboka" className="fw-medium">Avboka biljetter</Nav.Link>

        {/* Open Login Modal on Click */}
        <Nav.Link className="fw-medium" onClick={handleLoginShow}>Logga in</Nav.Link>

         {/* Navigate to register page on click */}
        <Nav.Link className="fw-medium" onClick={handleRegisterClick}>Bli medlem</Nav.Link>
      </Navbar>

      {/* Login Modal */}
      <LoginModal show={showLoginModal} handleClose={handleLoginClose} />
    </>
  );
}