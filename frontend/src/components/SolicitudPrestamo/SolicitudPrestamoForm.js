import React, { useState, useEffect } from 'react';
import { Form, Button, Container, ListGroup, InputGroup } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const SolicitudPrestamoForm = () => {
  const [solicitud, setSolicitud] = useState({
    clienteid: '',
    monto_solicitado: '',
    estado: 'Pendiente',
    observaciones: ''
  });

  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar clientes
  useEffect(() => {
    api.get('/clientes').then(res => setClientes(res.data));
  }, []);

  // Cargar solicitud si se edita
  useEffect(() => {
    if (id) {
      api.get(`/solicitudes/${id}`).then(res => {
        setSolicitud(res.data);
        if (res.data.clienteid) {
          const cliente = res.data.cliente || clientes.find(c => c.clienteid === res.data.clienteid);
          if (cliente) setClienteSeleccionado(cliente);
        }
      });
    }
  }, [id, clientes]);

  const clientesFiltrados = clientes.filter(c =>
    `${c.nombre} ${c.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSeleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setSolicitud({ ...solicitud, clienteid: cliente.clienteid });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? api.put(`/solicitudes/${id}`, solicitud)
      : api.post('/solicitudes', solicitud);
    request.then(() => navigate('/solicitudes'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Solicitud' : 'Agregar Solicitud'}</h2>

      {!clienteSeleccionado ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Buscar Cliente</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Escribe el nombre del cliente..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <ListGroup>
            {clientesFiltrados.map(cliente => (
              <ListGroup.Item
                key={cliente.clienteid}
                action
                onClick={() => handleSeleccionarCliente(cliente)}
              >
                {cliente.nombre} {cliente.apellido} (ID: {cliente.clienteid})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h5>Cliente seleccionado: {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}</h5>

          <Form.Group className="mb-3">
            <Form.Label>Monto Solicitado</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={solicitud.monto_solicitado}
              onChange={e => setSolicitud({ ...solicitud, monto_solicitado: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              value={solicitud.estado}
              onChange={e => setSolicitud({ ...solicitud, estado: e.target.value })}
              required
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={solicitud.observaciones}
              onChange={e => setSolicitud({ ...solicitud, observaciones: e.target.value })}
            />
          </Form.Group>

          <Button
            variant="secondary"
            className="me-2"
            onClick={() => {
              setClienteSeleccionado(null);
              setSolicitud({ ...solicitud, clienteid: '' });
            }}
          >
            Cambiar Cliente
          </Button>

          <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
        </Form>
      )}
    </Container>
  );
};

export default SolicitudPrestamoForm;
