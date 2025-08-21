import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const PagoForm = () => {
  const [pago, setPago] = useState({ cuotaID: '', monto: '', fecha: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/pagos/${id}`).then(res => setPago(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? api.put(`/pagos/${id}`, pago) : api.post('/pagos', pago);
    request.then(() => navigate('/pagos'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Pago' : 'Agregar Pago'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Plan Pago ID</Form.Label>
          <Form.Control type="number" value={pago.cuotaID} onChange={e => setPago({ ...pago, cuotaID: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Monto</Form.Label>
          <Form.Control type="number" value={pago.monto} onChange={e => setPago({ ...pago, monto: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control type="date" value={pago.fecha} onChange={e => setPago({ ...pago, fecha: e.target.value })} required/>
        </Form.Group>
        <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
      </Form>
    </Container>
  );
};

export default PagoForm;
