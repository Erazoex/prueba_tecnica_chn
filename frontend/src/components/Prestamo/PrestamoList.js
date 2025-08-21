import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const PrestamoList = () => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    api.get('/prestamos').then(res => setPrestamos(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Préstamos</h2>
      <Link to="/prestamos/create" className="btn btn-success mb-3">Agregar Préstamo</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Monto</th>
            <th>Cliente ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.prestamoID}>
              <td>{p.prestamoID}</td>
              <td>{p.monto}</td>
              <td>{p.clienteID}</td>
              <td>
                <Link to={`/prestamos/edit/${p.prestamoID}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => {
                  api.delete(`/prestamos/${p.prestamoID}`).then(() =>
                    setPrestamos(prestamos.filter(pre => pre.prestamoID !== p.prestamoID))
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

export default PrestamoList;
