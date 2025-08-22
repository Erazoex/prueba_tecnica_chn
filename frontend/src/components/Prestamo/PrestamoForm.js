import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const PrestamoForm = () => {
  const [prestamo, setPrestamo] = useState({
    solicitudID: '',
    clienteID: '',
    montoAprobado: '',
    tasaInteres: '',
    fechaAprobacion: '',
    estado: 'Activo'
  });

  const [solicitudes, setSolicitudes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar solicitudes y clientes
  useEffect(() => {
    api.get('/clientes').then(res => setClientes(res.data));
    api.get('/solicitudes').then(res => setSolicitudes(res.data));
  }, []);

  // Cargar préstamo si se edita
  useEffect(() => {
    if (id) {
      api.get(`/prestamos/${id}`).then(res => setPrestamo(res.data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? api.put(`/prestamos/${id}`, prestamo)
      : api.post('/prestamos', prestamo);
    request.then(() => navigate('/prestamos'));
  };

  return (
    <Container className="mt-4">
      <h2>{id ? 'Editar Préstamo' : 'Agregar Préstamo'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Solicitud</Form.Label>
          <Form.Select
            value={prestamo.solicitudID}
            onChange={e => setPrestamo({
              ...prestamo,
              solicitudID: e.target.value,
              clienteID: solicitudes.find(s => s.solicitudID === parseInt(e.target.value))?.clienteID || ''
            })}
            required
          >
            <option value="">Seleccione una solicitud</option>
            {solicitudes.map(s => {
              const cliente = clientes.find(c => c.clienteID === s.cliente.clienteID);
              const nombreCliente = cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido';
              return (
                <option key={s.solicitudID} value={s.solicitudID}>
                  {s.solicitudID} - {nombreCliente}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cliente</Form.Label>
          <Form.Select
            value={prestamo.clienteID}
            onChange={e => setPrestamo({ ...prestamo, clienteID: e.target.value })}
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map(c => (
              <option key={c.clienteID} value={c.clienteID}>
                {c.nombre} {c.apellido} (ID: {c.clienteID})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Monto Aprobado</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={prestamo.montoAprobado}
            onChange={e => setPrestamo({ ...prestamo, montoAprobado: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tasa de Interés (%)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={prestamo.tasaInteres}
            onChange={e => setPrestamo({ ...prestamo, tasaInteres: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de Aprobación</Form.Label>
          <Form.Control
            type="date"
            value={prestamo.fechaAprobacion ? prestamo.fechaAprobacion.split('T')[0] : ''}
            onChange={e => setPrestamo({ ...prestamo, fechaAprobacion: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            value={prestamo.estado}
            onChange={e => setPrestamo({ ...prestamo, estado: e.target.value })}
          >
            <option value="Activo">Activo</option>
            <option value="Pagado">Pagado</option>
            <option value="Incumplido">Incumplido</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
      </Form>
    </Container>
  );
};

export default PrestamoForm;
