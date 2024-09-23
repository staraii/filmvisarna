import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./wide-navbar.css";

export default function WideNavBar() {
  return (
    <Navbar bg="primary" className="wide-navbar justify-content-around ">
      
        <Nav.Link href="#hem" className="fw-medium">Hem</Nav.Link>
        <Nav.Link href="#filmer" className="fw-medium">Filmer</Nav.Link>
        <Nav.Link href="#visningar" className="fw-medium">Visningar</Nav.Link>
        <Nav.Link href="#avboka" className="fw-medium">Avboka biljetter</Nav.Link>
        <Nav.Link href="#Logga in" className="fw-medium">Logga in</Nav.Link>
        <Nav.Link href="#blimedlem" className="fw-medium">Bli medlem</Nav.Link>
    
    </Navbar>
  )
}