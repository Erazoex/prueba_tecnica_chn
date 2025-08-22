import React, { useState, useEffect } from 'react';
import { Form, Button, Container, ListGroup, InputGroup } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const PlanPagoForm = () => {
  const [plan, setPlan] = useState({
    prestamoID: '',
    numeroCuota: '',
    fechaVencimiento: '',
    montoCuota: '',
    capital: '',
    interes: '',
    estado: 'Pendiente'
  });

  const [prestamos, setPrestamos] = useState([]);
  const [busquedaPrestamo, setBusquedaPrestamo] = useState('');
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/prestamos').then(res => setPrestamos(res.data));
  }, []);

  useEffect(() => {
    if (id) {
      api.get(`/planpagos/${id}`).then(res => {
        setPlan(res.data);
        if (res.data.prestamoID) {
          const prestamo = prestamos.find(p => p.prestamoID === res.data.prestamoID);
          if (prestamo) setPrestamoSeleccionado(prestamo);
        }
      });
    }
  }, [id, prestamos]);

  const prestamosFiltrados = prestamos.filter(p =>
    p.prestamoID.toString().includes(busquedaPrestamo)
  );

  const handleSeleccionarPrestamo = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setPlan({ ...plan, prestamoID: prestamo.prestamoID });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? api.put(`/planpagos/${id}`, plan)
      : api.post('/planpagos', plan);
    request.then(() => navigate('/planpagos'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Plan de Pago' : 'Agregar Plan de Pago'}</h2>

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
                key={p.prestamoID}
                action
                onClick={() => handleSeleccionarPrestamo(p)}
              >
                Préstamo ID: {p.prestamoID} - Monto Aprobado: {p.montoAprobado} - Estado: {p.estado}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <h5>
          Préstamo seleccionado: ID {prestamoSeleccionado.prestamoID} - Monto Aprobado {prestamoSeleccionado.montoAprobado}
        </h5>
      )}

      {prestamoSeleccionado && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Número de Cuota</Form.Label>
            <Form.Control
              type="number"
              value={plan.numeroCuota}
              onChange={e => setPlan({ ...plan, numeroCuota: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Vencimiento</Form.Label>
            <Form.Control
              type="date"
              value={plan.fechaVencimiento}
              onChange={e => setPlan({ ...plan, fechaVencimiento: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Monto de la Cuota</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={plan.montoCuota}
              onChange={e => setPlan({ ...plan, montoCuota: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capital</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={plan.capital}
              onChange={e => setPlan({ ...plan, capital: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Interés</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={plan.interes}
              onChange={e => setPlan({ ...plan, interes: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              value={plan.estado}
              onChange={e => setPlan({ ...plan, estado: e.target.value })}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Pagada">Pagada</option>
              <option value="Atrasada">Atrasada</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="secondary"
            className="me-2"
            onClick={() => {
              setPrestamoSeleccionado(null);
              setPlan({ ...plan, prestamoID: '' });
            }}
          >
            Cambiar Préstamo
          </Button>

          <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
        </Form>
      )}
    </Container>
  );
};

export default PlanPagoForm;
