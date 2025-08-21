import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const PlanPagoForm = () => {
  const [plan, setPlan] = useState({ prestamoID: '', cuota: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/planpagos/${id}`).then(res => setPlan(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? api.put(`/planpagos/${id}`, plan) : api.post('/planpagos', plan);
    request.then(() => navigate('/planpagos'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Plan de Pago' : 'Agregar Plan de Pago'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Prestamo ID</Form.Label>
          <Form.Control type="number" value={plan.prestamoID} onChange={e => setPlan({ ...plan, prestamoID: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cuota</Form.Label>
          <Form.Control type="number" value={plan.cuota} onChange={e => setPlan({ ...plan, cuota: e.target.value })} required/>
        </Form.Group>
        <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
      </Form>
    </Container>
  );
};

export default PlanPagoForm;
