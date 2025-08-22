import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    api.get('/clientes').then(res => {
      console.log(res.data);
      setClientes(res.data);
    });
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
            <th>Apellido</th>
            <th>Número de Identificación</th>
            <th>Fecha de Nacimiento</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.clienteid}>
              <td>{c.clienteid}</td>
              <td>{c.nombre}</td>
              <td>{c.apellido}</td>
              <td>{c.numero_identificacion}</td>
              <td>{c.fecha_nacimiento}</td>
              <td>{c.direccion}</td>
              <td>{c.correo}</td>
              <td>{c.telefono}</td>
              <td>
                <Link to={`/clientes/edit/${c.clienteid}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => {
                  api.delete(`/clientes/${c.clienteid}`).then(() =>
                    setClientes(clientes.filter(cli => cli.clienteid !== c.clienteid))
                  );
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
