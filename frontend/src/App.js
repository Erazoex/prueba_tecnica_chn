import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

// Importar vistas
import ClienteList from './components/Cliente/ClienteList';
import ClienteForm from './components/Cliente/ClienteForm';
import PrestamoList from './components/Prestamo/PrestamoList';
import PrestamoForm from './components/Prestamo/PrestamoForm';
import PlanPagoList from './components/PlanPago/PlanPagoList';
import PlanPagoForm from './components/PlanPago/PlanPagoForm';
import PagoList from './components/Pago/PagoList';
import PagoForm from './components/Pago/PagoForm';
import SolicitudPrestamoList from './components/SolicitudPrestamo/SolicitudPrestamoList';
import SolicitudPrestamoForm from './components/SolicitudPrestamo/SolicitudPrestamoForm';
import LandingPage from './components/landingPage';
import GestionPrestamos from './components/GestionPrestamos'; 

function App() {
  return (
    <Router>
      <Navbar expand="lg" style={{ backgroundColor: '#243680' }} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Banco Nacional</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Clientes" id="clientes-dropdown">
                <NavDropdown.Item as={Link} to="/clientes">Listar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/clientes/create">Agregar</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Préstamos" id="prestamos-dropdown">
                <NavDropdown.Item as={Link} to="/prestamos">Listar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/prestamos/create">Agregar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/prestamos/gestion-prestamos">Gestión de Pagos</NavDropdown.Item> 
              </NavDropdown>

              <NavDropdown title="Planes de Pago" id="planpagos-dropdown">
                <NavDropdown.Item as={Link} to="/planpagos">Listar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/planpagos/create">Agregar</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Pagos" id="pagos-dropdown">
                <NavDropdown.Item as={Link} to="/pagos">Listar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/pagos/create">Agregar</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Solicitudes" id="solicitudes-dropdown">
                <NavDropdown.Item as={Link} to="/solicitudes">Listar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/solicitudes/create">Agregar</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          {/* Clientes */}
          <Route path="/clientes" element={<ClienteList />} />
          <Route path="/clientes/create" element={<ClienteForm />} />
          <Route path="/clientes/edit/:id" element={<ClienteForm />} />

          {/* Prestamos */}
          <Route path="/prestamos" element={<PrestamoList />} />
          <Route path="/prestamos/create" element={<PrestamoForm />} />
          <Route path="/prestamos/edit/:id" element={<PrestamoForm />} />
          <Route path="/prestamos/gestion-prestamos" element={<GestionPrestamos />} /> 

          {/* Planes de Pago */}
          <Route path="/planpagos" element={<PlanPagoList />} />
          <Route path="/planpagos/create" element={<PlanPagoForm />} />
          <Route path="/planpagos/edit/:id" element={<PlanPagoForm />} />

          {/* Pagos */}
          <Route path="/pagos" element={<PagoList />} />
          <Route path="/pagos/create" element={<PagoForm />} />
          <Route path="/pagos/edit/:id" element={<PagoForm />} />

          {/* Solicitudes de Prestamo */}
          <Route path="/solicitudes" element={<SolicitudPrestamoList />} />
          <Route path="/solicitudes/create" element={<SolicitudPrestamoForm />} />
          <Route path="/solicitudes/edit/:id" element={<SolicitudPrestamoForm />} />

          {/* Pagina principal */}
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
