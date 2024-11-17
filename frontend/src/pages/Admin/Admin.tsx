import { Outlet, NavLink } from "react-router-dom"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";


export default function Admin() {
  return (
    <Container className="admin-container">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Navbar
                className="bg-body-secondary py-3 px-4 admin-navbar"
                fixed="top"
              >
                <NavLink to="filmer" style={{ color: "#ffffff" }}>
                  Filmer
                </NavLink>
                <NavLink to="biljetter" style={{ color: "#ffffff" }}>
                  Biljetter
                </NavLink>
              </Navbar>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Outlet />
            </Col>
          </Row>
    </Container>
  );
}