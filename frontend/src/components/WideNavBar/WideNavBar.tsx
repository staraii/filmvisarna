import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authContext"; 
import { logout as authLogout } from "../../services/authService"; 
import { Modal, Button } from "react-bootstrap"; 
import "./wide-navbar.css";


const WideNavBar = () => {
  const { isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); 

  useEffect(() => {
   
  }, [isAuthenticated]); // Re-render the navbar when `isAuthenticated` changes

  const handleLogoutConfirmation = () => {
    setShowLogoutConfirmation(true); // Show the logout confirmation modal
  };

  const handleLogout = async () => {
    try {
      await authLogout(); 
      logout(); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setShowLogoutConfirmation(false); 
    }
  };

  const handleCloseLogoutConfirmation = () => {
    setShowLogoutConfirmation(false); 
  };

  return (
    <header className="logo-menu-header">
      <h1 className="h1_logo my-4">
        <Link to="/" style={{ textDecoration: "none", color: "#c15f6f" }}>
          Filmvisarna
        </Link>
      </h1>
      {/* Navbar */}
      <Navbar bg="primary" className="wide-navbar justify-content-around">
        <Nav.Link as={Link} to="/" className="fw-medium">
          Hem
        </Nav.Link>
        <Nav.Link as={Link} to="/filmer" className="fw-medium">
          Filmer
        </Nav.Link>
        <Nav.Link as={Link} to="/bio-kalender" className="fw-medium">
          Biokalender
        </Nav.Link>

        {/* Conditionally show the "Avboka biljetter" link if not authenticated */}
        {!isAuthenticated && (
          <Nav.Link className="fw-medium" onClick={() => navigate("/avboka")}>
            Avboka biljetter
          </Nav.Link>
        )}

        {/* Conditionally show login/logout and member/profile links based on auth status */}
        {isAuthenticated ? (
          <>
             <Nav.Link as={Link} to="/profil" className="fw-medium">
               Min profil
            </Nav.Link>
            <Nav.Link className="fw-medium" onClick={handleLogoutConfirmation}>
              Logga ut
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/loggain" className="fw-medium"> {/* Direct link to login page */}
              Logga in
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="fw-medium">
              Bli medlem
            </Nav.Link>
          </>
        )}
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutConfirmation} onHide={handleCloseLogoutConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Bekräfta utloggning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Är du säker på att du vill logga ut?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutConfirmation}>
            Avbryt
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Ja, logga ut
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default WideNavBar;












