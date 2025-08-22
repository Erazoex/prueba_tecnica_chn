import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const PagoList = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    api.get('/pagos').then(res => setPagos(res.data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este pago?')) {
      api.delete(`/pagos/${id}`).then(() =>
        setPagos(pagos.filter(pg => pg.pagoID !== id))
      );
    }
  };

  return (
    <Container className="mt-4">
      <h2>Pagos</h2>
      <Link to="/pagos/create" className="btn btn-success mb-3">Agregar Pago</Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Préstamo ID</th>
            <th>Cuota ID</th>
            <th>Monto Pagado</th>
            <th>Capital Pagado</th>
            <th>Interés Pagado</th>
            <th>Mora Pagada</th>
            <th>Fecha de Pago</th>
            <th>Método de Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((p) => (
            <tr key={p.pagoID}>
              <td>{p.pagoID}</td>
              <td>{p.prestamoID}</td>
              <td>{p.cuotaID}</td>
              <td>{p.montoPago}</td>
              <td>{p.capitalPagado}</td>
              <td>{p.interesPagado}</td>
              <td>{p.moraPagada}</td>
              <td>{p.fechaPago ? new Date(p.fechaPago).toLocaleDateString() : ''}</td>
              <td>{p.metodoPago}</td>
              <td>
                <Link to={`/pagos/edit/${p.pagoID}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.pagoID)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PagoList;
