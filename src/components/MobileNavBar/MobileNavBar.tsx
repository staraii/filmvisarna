import { useState } from "react";
import "./mobile-navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function MobileNavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    setShowMenu(false);
    navigate(`${path}`)
  }

  return (
    <Navbar fixed="bottom" bg="primary" className="navbar-bottom">
      <Nav.Link className="icon-link" onClick={() => navigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="#efecf8"
        >
          <path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z" />
        </svg>
      </Nav.Link>
      <Nav.Link className="icon-link" onClick={() => navigate("/filmer")}>
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
      <Nav.Link className="icon-link" onClick={() => navigate("/visningar")}>
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
     {/* Icon Link for Menu Button */}
  <Nav.Link className="menu-link" onClick={() => setShowMenu((showMenu) => !showMenu)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      fill="#efecf8"
      className="bi bi-three-dots"
      viewBox="0 0 16 16"
    >
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
    </svg>
  </Nav.Link>
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
          <Nav.Link className="fw-medium" onClick={() => handleNavigation("/avboka")}>
            Avboka platser
          </Nav.Link>
          <Nav.Link className="fw-medium" onClick={() => handleNavigation("/loggain")}>
            Logga in
          </Nav.Link>
          <Nav.Link
            className="fw-medium"
            onClick={() => handleNavigation("/blimedlem")}
          >
            Bli medlem
          </Nav.Link>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}