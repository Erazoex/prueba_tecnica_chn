import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const PlanPagoList = () => {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    api.get('/planpagos').then(res => setPlanes(res.data));
  }, []);

  const handleDelete = (id) => {
    api.delete(`/planpagos/${id}`).then(() =>
      setPlanes(planes.filter(p => p.cuotaID !== id))
    );
  };

  return (
    <Container className="mt-4">
      <h2>Planes de Pago</h2>
      <Link to="/planpagos/create" className="btn btn-success mb-3">
        Agregar Plan
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Préstamo ID</th>
            <th>Número de Cuota</th>
            <th>Fecha Vencimiento</th>
            <th>Monto Cuota</th>
            <th>Capital</th>
            <th>Interés</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {planes.map(p => (
            <tr key={p.cuotaID}>
              <td>{p.cuotaID}</td>
              <td>{p.prestamoID}</td>
              <td>{p.numeroCuota}</td>
              <td>{p.fechaVencimiento ? new Date(p.fechaVencimiento).toLocaleDateString() : ''}</td>
              <td>{p.montoCuota}</td>
              <td>{p.capital}</td>
              <td>{p.interes}</td>
              <td>{p.estado}</td>
              <td>
                <Link
                  to={`/planpagos/edit/${p.cuotaID}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Editar
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.cuotaID)}
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

export default PlanPagoList;
