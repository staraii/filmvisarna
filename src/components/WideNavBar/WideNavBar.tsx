import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Link, useNavigate } from "react-router-dom";
import { WideNavBarProps } from '../../utils/Types';  // Make sure to import the type

import "./wide-navbar.css";


const WideNavBar = ({ isLoggedIn, onLoginClick, onLogout }: WideNavBarProps) => {
  const navigate = useNavigate();

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
        <Nav.Link className="fw-medium" onClick={() => navigate("/bio-kalender")}>
          Bio kalender
        </Nav.Link>
        <Nav.Link className="fw-medium" onClick={() => navigate("/avboka")}>
          Avboka biljetter
        </Nav.Link>

        {/* Show login or logout based on isLoggedIn */}
        {isLoggedIn ? (
          <Nav.Link className="fw-medium" onClick={onLogout}>
            Logga ut
          </Nav.Link>
        ) : (
          <>
            <Nav.Link className="fw-medium" onClick={onLoginClick}>
              Logga in
            </Nav.Link>
            <Nav.Link className="fw-medium" onClick={() => navigate("/register")}>
              Bli medlem
            </Nav.Link>
          </>
        )}
      </Navbar>

      {/* Login Modal is controlled in App, so no need to include it here */}
    </header>
  );
};

export default WideNavBar;
