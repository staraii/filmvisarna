import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authContext"; // Importing AuthContext for auth state
import { logout as authLogout } from "../../services/authService"; // Import your logout function from authService
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button for confirmation
import "./wide-navbar.css";

const WideNavBar = () => {
  const { isAuthenticated, logout } = useAuth(); // Access authentication state and logout function
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State for logout confirmation modal

  useEffect(() => {
    console.log("Authentication state changed:", isAuthenticated);
  }, [isAuthenticated]); // Re-render the navbar when `isAuthenticated` changes

  const handleLogoutConfirmation = () => {
    setShowLogoutConfirmation(true); // Show the logout confirmation modal
  };

  const handleLogout = async () => {
    try {
      await authLogout(); // Call the logout function from your auth service
      logout(); // Call the context's logout function to update the state
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show a user-friendly message here
    } finally {
      setShowLogoutConfirmation(false); // Close the logout confirmation modal
    }
  };

  const handleCloseLogoutConfirmation = () => {
    setShowLogoutConfirmation(false); // Close the logout confirmation modal
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
          Bio kalender
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












