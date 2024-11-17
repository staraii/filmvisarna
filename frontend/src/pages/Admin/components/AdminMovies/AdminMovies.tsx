import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import { loaderQuery } from "../../../../utils/queryService";
import { QueryParams } from "../../../../utils/queryService";

import { parseDateToStringYYYYMMDD } from "../../../../utils/dateTimeUtils";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";



type MoviesListItem = {
  id: number;
  title: string;
  createdAt: string;
}


export default function AdminMovies() {
  const queryParams = useLoaderData() as QueryParams;
  const { data } = useSuspenseQuery(loaderQuery(queryParams));
  const movies: MoviesListItem[] = data;

  const [isOpen, setIsOpen] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const handleIsOpen = (value: string) => {
    if (value === isOpen) {
      setIsOpen(null);
      setShowDelete(null);
    } else {
      setIsOpen(value);
      setShowDelete(null)
    }
  };
  const handleShowDelete = (value: string) => {
    setShowDelete(value === showDelete ? null : value);
  }
  const navigate = useNavigate();
  return (
    <Container as="main" className="px-5">
      <Row xs={1} md={1} xl={1}>
        <Col className="py-5">
          <Button variant="secondary" className="w-75" onClick={() => navigate("/admin/film/ny")}>Lägg till ny film</Button>
        </Col>
      </Row>
            {movies &&
        movies.map((movie) => (
                <Row xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  className="text-start border border-secondary rounded my-4"
                >
                  <Row className="my-3 d-flex flex-row justify-content-between">
                    <Col xs={10} md={10} xl={10}>
                      {movie.title}
                    </Col>
                    <Col
                      xs={2}
                      md={2}
                      xl={2}
                      className="d-flex flex-row justify-content-end"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleIsOpen(movie.title)}
                      >
                        {isOpen === movie.title ? "-" : "+"}
                      </Button>
                    </Col>
                  </Row>
                  {isOpen === movie.title && (
                    <>
                      <Row className="d-flex flex-row justify-content-between my-5">
                        <Col xs={7}>
                          <small>Tillagd: </small>
                          <small>
                            {parseDateToStringYYYYMMDD(movie.createdAt)}
                          </small>
                        </Col>
                        <Col
                          xs={5}
                          className="d-flex flex-row justify-content-end"
                        >
                          <Button size="sm" variant="outline-secondary">
                            Se statistik
                          </Button>
                        </Col>
                      </Row>
                      <Row className="my-5">
                        <Col
                          xs={6}
                          className="d-flex flex-row justify-content-center"
                        >
                          <Button variant="outline-secondary" className="w-100">
                            Ändra
                          </Button>
                        </Col>
                        <Col
                          xs={6}
                          className="d-flex flex-row justify-content-center"
                        >
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => handleShowDelete(movie.title)}
                          >
                            {showDelete === movie.title? "Ångra" : "Ta bort"}
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                  {showDelete === movie.title && (
                    <>
                      <Row>
                        <Col>
                          <p className="text-center fs-5">Ta bort film?</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            variant="outline-danger"
                            className="w-100 mb-4"
                          >
                            Ta bort
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </Col>
           </Row>
        ))}
    </Container>
  );
}
