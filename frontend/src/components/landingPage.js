import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded-3">
            <Card.Body>
              <h1 className="mb-4 text-primary">Bienvenido a Banco Nacional</h1>
              <p className="lead mb-4">
                Administra tus clientes, solicitudes de préstamo y préstamos de manera sencilla.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/clientes">
                  <Button variant="primary" size="lg">
                    Clientes
                  </Button>
                </Link>
                <Link to="/solicitudes">
                  <Button variant="primary" size="lg">
                    Solicitudes
                  </Button>
                </Link>
                <Link to="/prestamos">
                  <Button variant="primary" size="lg">
                    Préstamos
                  </Button>
                </Link>
                <Link to="/planpagos">
                  <Button variant="primary" size="lg">
                    Planes de pago
                  </Button>
                </Link>
                <Link to="/pagos">
                  <Button variant="primary" size="lg">
                    Pagos
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
