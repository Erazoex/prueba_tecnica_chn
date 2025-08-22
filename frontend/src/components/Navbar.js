import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AppNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" style={{ backgroundColor: '#243680' }}>
      <Container>
        <Navbar.Brand href="/">Banco CHN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/clientes"><Nav.Link>Clientes</Nav.Link></LinkContainer>
            <LinkContainer to="/prestamos"><Nav.Link>Préstamos</Nav.Link></LinkContainer>
            <LinkContainer to="/planpagos"><Nav.Link>Plan Pagos</Nav.Link></LinkContainer>
            <LinkContainer to="/pagos"><Nav.Link>Pagos</Nav.Link></LinkContainer>
            <LinkContainer to="/solicitudes"><Nav.Link>Solicitudes</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
