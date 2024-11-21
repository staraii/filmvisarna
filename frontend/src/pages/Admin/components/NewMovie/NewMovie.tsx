import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieForm from "../MovieForm/MovieForm";


export default function NewMovie() {
  return (
    <Container className="my-0">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MovieForm />
        </Col>
      </Row>
    </Container>
  );
}