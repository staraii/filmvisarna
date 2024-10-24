
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/authContext"; // Importing AuthContext for auth state
import { logout as authLogout } from "../../services/authService"; // Import your logout function from authService
import "./wide-navbar.css";

interface WideNavBarProps {
  onLoginShow: () => void; // Props to trigger login modal
}

const WideNavBar = ({ onLoginShow }: WideNavBarProps) => {
  const { isAuthenticated, logout } = useAuth(); // Access authentication state and logout function
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authLogout(); // Call the logout function from your auth service
      logout(); // Call the context's logout function to update the state
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show a user-friendly message here
    }
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

        {/* Conditionally show login/logout and member/profile links based on auth status */}
        {isAuthenticated ? (
          <>
            <Nav.Link as={Link} to="/profile" className="fw-medium">
              Min profil
            </Nav.Link>
            <Nav.Link className="fw-medium" onClick={handleLogout}>
              Logga ut
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link className="fw-medium" onClick={onLoginShow}>
              Logga in
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="fw-medium">
              Bli medlem
            </Nav.Link>
          </>
        )}
      </Navbar>
    </header>
  );
};

export default WideNavBar;





