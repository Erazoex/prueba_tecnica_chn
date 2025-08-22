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
        setPagos(pagos.filter(pg => pg.pagoid !== id))
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
            <tr key={p.pagoid}>
              <td>{p.pagoid}</td>
              <td>{p.prestamoid}</td>
              <td>{p.cuotaid}</td>
              <td>{p.monto_pagado}</td>
              <td>{p.capital_pagado}</td>
              <td>{p.interes_pagado}</td>
              <td>{p.mora_pagada}</td>
              <td>{p.fecha_pago ? new Date(p.fecha_pago).toLocaleDateString() : ''}</td>
              <td>{p.metodo_pago}</td>
              <td>
                <Link to={`/pagos/edit/${p.pagoid}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.pagoid)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PagoList;
