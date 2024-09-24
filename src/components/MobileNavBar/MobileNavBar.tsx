import { useState } from "react";
import "./mobile-navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function MobileNavBar() {
  const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

     // Function to handle navigation to the register page
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the Register page
  };

  return (
    <Navbar fixed="bottom" bg="primary" className="navbar-bottom">
      <Nav.Link href="/" className="icon-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#efecf8"
          className="bi bi-house"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>
      </Nav.Link>
      <Nav.Link href="/filmer" className="icon-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#efecf8"
          className="bi bi-film"
          viewBox="0 0 16 16"
        >
          <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
        </svg>
      </Nav.Link>
      <Nav.Link href="/visningar" className="icon-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#efecf8"
          className="bi bi-calendar3"
          viewBox="0 0 16 16"
        >
          <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
          <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        </svg>
      </Nav.Link>
      <button
        type="button"
        onClick={() => setShowMenu((showMenu) => !showMenu)}
        className="menu-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#efecf8"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>
      </button>
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu((showMenu) => !showMenu)}
        scroll={false}
        backdrop={true}
        placement="end"
        name="end"
        className="d-flex flex-column justify-content-end"
      >
        <Offcanvas.Header closeButton>
          {/* Empty element, just to make closing X visible */}
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-end pb-5 mb-5">
          <Nav.Link href="/avboka">Avboka platser</Nav.Link>
          <Nav.Link href="/loggain">Logga in</Nav.Link>
          {/* Navigate to register page on click */}
          <Nav.Link className="fw-medium" onClick={handleRegisterClick}>
            Bli medlem
          </Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}