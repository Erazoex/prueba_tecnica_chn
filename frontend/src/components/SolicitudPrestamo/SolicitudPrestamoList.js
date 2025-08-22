import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const SolicitudPrestamoList = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    api.get('/solicitudes').then(res => setSolicitudes(res.data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta solicitud?')) {
      api.delete(`/solicitudes/${id}`).then(() =>
        setSolicitudes(solicitudes.filter(sol => sol.solicitudid !== id))
      );
    }
  };

  return (
    <Container className="mt-4">
      <h2>Solicitudes de Préstamo</h2>
      <Link to="/solicitudes/create" className="btn btn-success mb-3">
        Agregar Solicitud
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Monto Solicitado</th>
            <th>Fecha Solicitud</th>
            <th>Estado</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.solicitudid}>
              <td>{s.solicitudid}</td>
              <td>
                {s.cliente
                  ? `${s.cliente.nombre} ${s.cliente.apellido}`
                  : `ID: ${s.clienteid}`}
              </td>
              <td>{s.monto_solicitado}</td>
              <td>{s.fecha_solicitud ? new Date(s.fecha_solicitud).toLocaleDateString() : ''}</td>
              <td>{s.estado}</td>
              <td>{s.observaciones || '-'}</td>
              <td>
                <Link
                  to={`/solicitudes/edit/${s.solicitudid}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Editar
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(s.solicitudid)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SolicitudPrestamoList;
