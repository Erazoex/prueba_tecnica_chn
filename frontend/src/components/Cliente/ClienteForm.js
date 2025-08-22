import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const ClienteForm = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    numeroIdentificacion: '',
    fechaNacimiento: '',
    direccion: '',
    correoElectronico: '',
    telefono: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) api.get(`/clientes/${id}`).then(res => setCliente(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? api.put(`/clientes/${id}`, cliente) : api.post('/clientes', cliente);
    request.then(() => navigate('/clientes'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={cliente.nombre} onChange={e => setCliente({ ...cliente, nombre: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" value={cliente.apellido} onChange={e => setCliente({ ...cliente, apellido: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Número de Identificación</Form.Label>
          <Form.Control type="text" value={cliente.numeroIdentificacion} onChange={e => setCliente({ ...cliente, numeroIdentificacion: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control type="date" value={cliente.fechaNacimiento} onChange={e => setCliente({ ...cliente, fechaNacimiento: e.target.value })} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" value={cliente.direccion} onChange={e => setCliente({ ...cliente, direccion: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" value={cliente.correoElectronico} onChange={e => setCliente({ ...cliente, correoElectronico: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" value={cliente.telefono} onChange={e => setCliente({ ...cliente, telefono: e.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
      </Form>
    </Container>
  );
};

export default ClienteForm;
