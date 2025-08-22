import React, { useState, useEffect } from 'react';
import { Form, Button, Container, ListGroup, InputGroup } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const PagoForm = () => {
  const [pago, setPago] = useState({
    prestamoid: '',
    cuotaid: '',
    fecha_pago: '',
    monto_pago: '',
    capital_pagado: '',
    interes_pagado: '',
    mora_pagada: ''
  });

  const [prestamos, setPrestamos] = useState([]);
  const [planes, setPlanes] = useState([]);

  const [busquedaPrestamo, setBusquedaPrestamo] = useState('');
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);

  const [busquedaPlan, setBusquedaPlan] = useState('');
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar préstamos y planes
  useEffect(() => {
    api.get('/prestamos').then(res => setPrestamos(res.data));
    api.get('/planpagos').then(res => setPlanes(res.data));
  }, []);

  // Cargar pago si se edita
  useEffect(() => {
    if (id) {
      api.get(`/pagos/${id}`).then(res => {
        setPago(res.data);
        if (res.data.prestamoid) {
          const prestamo = prestamos.find(p => p.prestamoid === res.data.prestamoid);
          if (prestamo) setPrestamoSeleccionado(prestamo);
        }
        if (res.data.cuotaid) {
          const plan = planes.find(p => p.cuotaid === res.data.cuotaid);
          if (plan) setPlanSeleccionado(plan);
        }
      });
    }
  }, [id, prestamos, planes]);

  const prestamosFiltrados = prestamos.filter(p =>
    p.prestamoid.toString().includes(busquedaPrestamo)
  );

  const planesFiltrados = planes.filter(p =>
    p.cuotaid.toString().includes(busquedaPlan)
  );

  const handleSeleccionarPrestamo = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setPago({ ...pago, prestamoid: prestamo.prestamoid });
  };

  const handleSeleccionarPlan = (plan) => {
    setPlanSeleccionado(plan);
    setPago({ ...pago, cuotaid: plan.cuotaid });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? api.put(`/pagos/${id}`, pago)
      : api.post('/pagos', pago);
    request.then(() => navigate('/pagos'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Pago' : 'Agregar Pago'}</h2>

      {/* Selección de Préstamo */}
      {!prestamoSeleccionado ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Buscar Préstamo</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Escribe el ID del préstamo..."
                value={busquedaPrestamo}
                onChange={e => setBusquedaPrestamo(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ListGroup className="mb-3">
            {prestamosFiltrados.map(p => (
              <ListGroup.Item
                key={p.prestamoid}
                action
                onClick={() => handleSeleccionarPrestamo(p)}
              >
                Préstamo ID: {p.prestamoid} - Monto Aprobado: {p.monto_aprobado}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <h5>Préstamo seleccionado: ID {prestamoSeleccionado.prestamoid}</h5>
      )}

      {/* Selección de Plan */}
      {!planSeleccionado ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Buscar Plan de Pago</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Escribe el ID de la cuota..."
                value={busquedaPlan}
                onChange={e => setBusquedaPlan(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ListGroup className="mb-3">
            {planesFiltrados.map(p => (
              <ListGroup.Item
                key={p.cuotaid}
                action
                onClick={() => handleSeleccionarPlan(p)}
              >
                Cuota ID: {p.cuotaid} - Préstamo ID: {p.prestamoid} - Cuota: {p.numero_cuota}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <h5>
          Plan seleccionado: Cuota ID {planSeleccionado.cuotaid} - Préstamo ID {planSeleccionado.prestamoid}
        </h5>
      )}

      {/* Formulario de Pago */}
      {prestamoSeleccionado && planSeleccionado && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Monto Pagado</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={pago.monto_pago}
              onChange={e => setPago({ ...pago, monto_pago: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capital Pagado</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={pago.capital_pagado}
              onChange={e => setPago({ ...pago, capital_pagado: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Interés Pagado</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={pago.interes_pagado}
              onChange={e => setPago({ ...pago, interes_pagado: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mora Pagada</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={pago.mora_pagada}
              onChange={e => setPago({ ...pago, mora_pagada: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Pago</Form.Label>
            <Form.Control
              type="date"
              value={pago.fecha_pago ? pago.fecha_pago.split('T')[0] : ''}
              onChange={e => setPago({ ...pago, fecha_pago: e.target.value })}
              required
            />
          </Form.Group>

          <Button variant="secondary" className="me-2" onClick={() => {
            setPrestamoSeleccionado(null);
            setPago({ ...pago, prestamoid: '' });
          }}>
            Cambiar Préstamo
          </Button>

          <Button variant="secondary" className="me-2" onClick={() => {
            setPlanSeleccionado(null);
            setPago({ ...pago, cuotaid: '' });
          }}>
            Cambiar Plan
          </Button>

          <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
        </Form>
      )}
    </Container>
  );
};

export default PagoForm;
