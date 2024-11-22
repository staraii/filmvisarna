import { useState } from "react";
import "./mobile-navbar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";
import { useAuth } from "../../utils/authContext"; 
import { logout as authLogout } from "../../services/authService"; 
import { useEffect } from "react";


export default function MobileNavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();


  const handleNavigation = (path: string) => {
    setShowMenu(false);
    navigate(`${path}`);
  };

  

    useEffect(() => {
   
    }, [isAuthenticated]); // Re-render the navbar when `isAuthenticated` changes
  
    const handleLogout = async () => {
    try {
      await authLogout(); 
      logout(); 
      navigate("/") 
    } catch (error) {
      console.error("Logout failed:", error);
    
    } finally {
      setShowMenu(false); 
    }
  };

  

  
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
          viewBox="0 0 16 16"
        >
          <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
        </svg>
      </Nav.Link>
      <Nav.Link className="icon-link" onClick={() => navigate("/bio-kalender")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#efecf8"
          viewBox="0 0 16 16"
        >
          <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
          <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        </svg>
      </Nav.Link>
      {/* Icon Link for Menu Button */}
      <Nav.Link
        className="menu-link"
        onClick={() => setShowMenu((showMenu) => !showMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="#efecf8"
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
        className="d-flex flex-column justify-content-around"
      >
        <Offcanvas.Header closeButton>
          {/* Empty element, just to make closing X visible */}
        </Offcanvas.Header>
        <Offcanvas.Body
          className="d-flex flex-column justify-content-around mb-5"
          style={{ overflow: "hidden" }}
        >
          {/* SoMe icons */}
          <Stack gap={4} className="my-auto d-flex flex-column">
            {/* Facebook */}
            <Nav.Link
              className="w-100 d-flex flex-row align-items-center  some-link facebook-link"
              style={{ overflow: "hidden" }}
            >
              {/* <div className="at-facebook">@filmvisarna</div> */}
              <svg
                className="facebook-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="#efecf8"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
            </Nav.Link>
            {/* Messenger */}
            <Nav.Link
              className="w-100 d-flex flex-row align-items-center some-link messenger-link"
              style={{ overflow: "hidden" }}
            >
              {/* <div
                className="at-messenger"
              >
                messenger
              </div> */}
              <svg
                className="messenger-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
              </svg>
            </Nav.Link>

            {/* Instagram */}
            <Nav.Link
              className="w-100 d-flex flex-row align-items-center some-link instagram-link"
              style={{ overflow: "hidden" }}
            >
              {/* <div className="at-instagram">@filmvisarna</div> */}
              <svg
                className="instagram-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </Nav.Link>

            {/* X */}
            <Nav.Link
              className="w-100 d-flex flex-row align-items-center some-link x-link"
              style={{ overflow: "hidden" }}
            >
              {/* <div className="at-x">@filmvisarna</div> */}
              <svg
                className="x-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
              </svg>
            </Nav.Link>

            {/* Mail */}
            <Nav.Link
              className="w-100 d-flex flex-row align-items-center some-link mail-link"
              style={{ overflow: "hidden" }}
            >
              {/* <div className="at-mail">info@filmvisarna.se</div> */}
              <svg
                className="mail-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
            </Nav.Link>

            {/* Telefon */}
            <Nav.Link
              className="w-100 d-flex flex-row align-items-center some-link phone-link"
              style={{ overflow: "hidden" }}
            >
              {/* <div className="at-phone">08 - 123 456</div> */}
              <svg
                className="phone-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                />
              </svg>
            </Nav.Link>
          </Stack>

            {isAuthenticated ? (
            <>
              <Nav.Link
                className="fw-medium mb-3"
                onClick={() => handleNavigation("/profil")}
              >
                Min profil
              </Nav.Link>
              <Nav.Link className="fw-medium" onClick={handleLogout}>
                Logga ut
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                className="fw-medium mb-3"
                onClick={() => handleNavigation("/avboka")}
              >
                Avboka platser
              </Nav.Link>
              <Nav.Link
                className="fw-medium mb-3"
                onClick={() => handleNavigation("/loggain")}
              >
                Logga in
              </Nav.Link>
              <Nav.Link
                className="fw-medium"
                onClick={() => handleNavigation("/register")}
              >
                Bli medlem
              </Nav.Link>
            </>
          )}

          
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

