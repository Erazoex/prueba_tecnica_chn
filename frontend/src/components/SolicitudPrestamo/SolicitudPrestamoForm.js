import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const SolicitudPrestamoForm = () => {
  const [solicitud, setSolicitud] = useState({ clienteID: '', montoSolicitado: '', estado: 'Pendiente' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/solicitudes/${id}`).then(res => setSolicitud(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? api.put(`/solicitudes/${id}`, solicitud) : api.post('/solicitudes', solicitud);
    request.then(() => navigate('/solicitudes'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Solicitud' : 'Agregar Solicitud'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Cliente ID</Form.Label>
          <Form.Control type="number" value={solicitud.clienteID} onChange={e => setSolicitud({ ...solicitud, clienteID: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Monto Solicitado</Form.Label>
          <Form.Control type="number" value={solicitud.montoSolicitado} onChange={e => setSolicitud({ ...solicitud, montoSolicitado: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select value={solicitud.estado} onChange={e => setSolicitud({ ...solicitud, estado: e.target.value })}>
            <option>Pendiente</option>
            <option>Aprobado</option>
            <option>Rechazado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
      </Form>
    </Container>
  );
};

export default SolicitudPrestamoForm;
