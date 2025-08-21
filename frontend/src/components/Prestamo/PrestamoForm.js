import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const PrestamoForm = () => {
  const [prestamo, setPrestamo] = useState({ monto: '', clienteID: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/prestamos/${id}`).then(res => setPrestamo(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? api.put(`/prestamos/${id}`, prestamo) : api.post('/prestamos', prestamo);
    request.then(() => navigate('/prestamos'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Préstamo' : 'Agregar Préstamo'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Monto</Form.Label>
          <Form.Control type="number" value={prestamo.monto} onChange={e => setPrestamo({ ...prestamo, monto: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cliente ID</Form.Label>
          <Form.Control type="number" value={prestamo.clienteID} onChange={e => setPrestamo({ ...prestamo, clienteID: e.target.value })} required/>
        </Form.Group>
        <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
      </Form>
    </Container>
  );
};

export default PrestamoForm;
