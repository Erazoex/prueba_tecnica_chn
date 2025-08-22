import React, { useState, useEffect } from 'react';
import { Form, Button, Container, ListGroup, InputGroup } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const PagoForm = () => {
  const [pago, setPago] = useState({
    cuotaid: '',
    monto_pagado: '',
    fecha_pago: '',
    metodo_pago: 'Efectivo',
  });

  const [planes, setPlanes] = useState([]);
  const [busquedaPlan, setBusquedaPlan] = useState('');
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/planpagos').then(res => setPlanes(res.data));
  }, []);

  useEffect(() => {
    if (id) {
      api.get(`/pagos/${id}`).then(res => {
        setPago(res.data);
        if (res.data.cuotaid) {
          const plan = planes.find(p => p.cuotaid === res.data.cuotaid);
          if (plan) setPlanSeleccionado(plan);
        }
      });
    }
  }, [id, planes]);

  const planesFiltrados = planes.filter(p =>
    p.cuotaid.toString().includes(busquedaPlan)
  );

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

      {planSeleccionado && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Monto Pagado</Form.Label>
            <Form.Control
              type="number"
              value={pago.monto_pagado}
              onChange={e => setPago({ ...pago, monto_pagado: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Pago</Form.Label>
            <Form.Control
              type="date"
              value={pago.fecha_pago}
              onChange={e => setPago({ ...pago, fecha_pago: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Select
              value={pago.metodo_pago}
              onChange={e => setPago({ ...pago, metodo_pago: e.target.value })}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
            </Form.Select>
          </Form.Group>

          <Button
            variant="secondary"
            className="me-2"
            onClick={() => {
              setPlanSeleccionado(null);
              setPago({ ...pago, cuotaid: '' });
            }}
          >
            Cambiar Plan
          </Button>

          <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
        </Form>
      )}
    </Container>
  );
};

export default PagoForm;
