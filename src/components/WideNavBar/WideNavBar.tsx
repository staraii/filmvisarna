import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./wide-navbar.css";
import LoginModal from "../Login-pop-up/LoginModal";

export default function WideNavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginShow = () => setShowLoginModal(true);
  const handleLoginClose = () => setShowLoginModal(false);

  return (
    <header className="logo-menu-header">
      <h1 className="h1_logo my-4">
        <Link to="/" style={{ textDecoration: "none", color: "#c15f6f" }}>
          Filmvisarna
        </Link>
      </h1>
      {/* Navbar */}
      <Navbar bg="primary" className="wide-navbar justify-content-around">
        <Nav.Link className="fw-medium" onClick={() => navigate("/")}>
          Hem
        </Nav.Link>
        <Nav.Link className="fw-medium" onClick={() => navigate("/film")}>
          Filmer
        </Nav.Link>
        <Nav.Link
          className="fw-medium"
          onClick={() => navigate("/bio-kalender")}
        >
          Bio kalender
        </Nav.Link>
        <Nav.Link className="fw-medium" onClick={() => navigate("/avboka")}>
          Avboka biljetter
        </Nav.Link>

        {/* Open Login Modal on Click */}
        <Nav.Link className="fw-medium" onClick={handleLoginShow}>
          Logga in
        </Nav.Link>
        <Nav.Link className="fw-medium" onClick={() => navigate("/register")}>Bli medlem</Nav.Link>
      </Navbar>

      {/* Login Modal */}
      <LoginModal show={showLoginModal} handleClose={handleLoginClose} />
    </header>
  );
}
