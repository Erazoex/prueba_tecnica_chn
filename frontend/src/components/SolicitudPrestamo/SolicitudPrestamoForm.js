import React, { useState, useEffect } from 'react';
import { Form, Button, Container, ListGroup, InputGroup } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const SolicitudPrestamoForm = () => {
  const [solicitud, setSolicitud] = useState({
    montoSolicitado: '',
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
        setSolicitud({
          montoSolicitado: res.data.montoSolicitado,
          estado: res.data.estado,
          observaciones: res.data.observaciones || ''
        });

        if (res.data.cliente) {
          setClienteSeleccionado(res.data.cliente);
        }
      });
    }
  }, [id]);

  const clientesFiltrados = clientes.filter(c =>
    `${c.nombre} ${c.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSeleccionarCliente = cliente => {
    setClienteSeleccionado(cliente);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!clienteSeleccionado) {
      alert('Debes seleccionar un cliente');
      return;
    }

    const payload = {
      ...solicitud,
      cliente: { clienteID: clienteSeleccionado.clienteID }
    };

    const request = id
      ? api.put(`/solicitudes/${id}`, payload)
      : api.post('/solicitudes', payload);

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
                key={cliente.clienteID}
                action
                onClick={() => handleSeleccionarCliente(cliente)}
              >
                {cliente.nombre} {cliente.apellido} (ID: {cliente.clienteID})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <Form onSubmit={handleSubmit}>
          <h5>
            Cliente seleccionado: {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
          </h5>

          <Form.Group className="mb-3">
            <Form.Label>Monto Solicitado</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={solicitud.montoSolicitado}
              onChange={e =>
                setSolicitud({ ...solicitud, montoSolicitado: e.target.value })
              }
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
              onChange={e =>
                setSolicitud({ ...solicitud, observaciones: e.target.value })
              }
            />
          </Form.Group>

          <Button
            variant="secondary"
            className="me-2"
            onClick={() => {
              setClienteSeleccionado(null);
            }}
          >
            Cambiar Cliente
          </Button>

          <Button variant="primary" type="submit">
            {id ? 'Actualizar' : 'Crear'}
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default SolicitudPrestamoForm;
