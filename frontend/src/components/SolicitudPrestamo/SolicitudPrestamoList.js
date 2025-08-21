import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const SolicitudPrestamoList = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    api.get('/solicitudes').then(res => setSolicitudes(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Solicitudes de Préstamo</h2>
      <Link to="/solicitudes/create" className="btn btn-success mb-3">Agregar Solicitud</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente ID</th>
            <th>Monto Solicitado</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(s => (
            <tr key={s.solicitudID}>
              <td>{s.solicitudID}</td>
              <td>{s.clienteID}</td>
              <td>{s.montoSolicitado}</td>
              <td>{s.estado}</td>
              <td>
                <Link to={`/solicitudes/edit/${s.solicitudID}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => {
                  api.delete(`/solicitudes/${s.solicitudID}`).then(() =>
                    setSolicitudes(solicitudes.filter(sol => sol.solicitudID !== s.solicitudID))
                  )
                }}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SolicitudPrestamoList;
