import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const PagoList = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    api.get('/pagos').then(res => setPagos(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Pagos</h2>
      <Link to="/pagos/create" className="btn btn-success mb-3">Agregar Pago</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Plan Pago ID</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map(p => (
            <tr key={p.pagoID}>
              <td>{p.pagoID}</td>
              <td>{p.cuotaID}</td>
              <td>{p.monto}</td>
              <td>{p.fecha}</td>
              <td>
                <Link to={`/pagos/edit/${p.pagoID}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => {
                  api.delete(`/pagos/${p.pagoID}`).then(() =>
                    setPagos(pagos.filter(pg => pg.pagoID !== p.pagoID))
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

export default PagoList;
