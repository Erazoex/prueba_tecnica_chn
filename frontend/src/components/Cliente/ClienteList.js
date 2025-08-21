import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    api.get('/clientes').then(res => setClientes(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Clientes</h2>
      <Link to="/clientes/create" className="btn btn-success mb-3">Agregar Cliente</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.clienteID}>
              <td>{c.clienteID}</td>
              <td>{c.nombre}</td>
              <td>{c.correo}</td>
              <td>
                <Link to={`/clientes/edit/${c.clienteID}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => {
                  api.delete(`/clientes/${c.clienteID}`).then(() =>
                    setClientes(clientes.filter(cli => cli.clienteID !== c.clienteID))
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

export default ClienteList;
