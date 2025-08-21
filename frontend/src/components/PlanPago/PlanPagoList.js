import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const PlanPagoList = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    api.get('/planpagos').then(res => setPlanes(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Planes de Pago</h2>
      <Link to="/planpagos/create" className="btn btn-success mb-3">Agregar Plan</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prestamo ID</th>
            <th>Cuota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {planes.map(p => (
            <tr key={p.cuotaID}>
              <td>{p.cuotaID}</td>
              <td>{p.prestamoID}</td>
              <td>{p.cuota}</td>
              <td>
                <Link to={`/planpagos/edit/${p.cuotaID}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => {
                  api.delete(`/planpagos/${p.cuotaID}`).then(() =>
                    setPlanes(planes.filter(pl => pl.cuotaID !== p.cuotaID))
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

export default PlanPagoList;
