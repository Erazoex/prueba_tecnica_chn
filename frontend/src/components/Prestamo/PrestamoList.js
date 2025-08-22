import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { api } from '../../api';
import { Link } from 'react-router-dom';

const PrestamoList = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Cargar préstamos
    api.get('/prestamos').then(res => setPrestamos(res.data));
    // Cargar clientes
    api.get('/clientes').then(res => setClientes(res.data));
  }, []);

  // Crear diccionario de clientes por ID para acceso rápido
  const clientesMap = clientes.reduce((acc, cliente) => {
    acc[cliente.clienteID] = `${cliente.nombre} ${cliente.apellido}`;
    return acc;
  }, {});

  return (
    <Container className="mt-4">
      <h2>Préstamos</h2>
      <Link to="/prestamos/create" className="btn btn-success mb-3">Agregar Préstamo</Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Solicitud ID</th>
            <th>Cliente</th>
            <th>Monto Aprobado</th>
            <th>Plazo (meses)</th>
            <th>Tasa Interés (%)</th>
            <th>Fecha de Aprobación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.prestamoID}>
              <td>{p.prestamoID}</td>
              <td>{p.solicitudID}</td>
              <td>
                {clientesMap[p.clienteID] 
                  ? `${clientesMap[p.clienteID]} (ID: ${p.clienteID})`
                  : `ID: ${p.clienteID}`}
              </td>
              <td>{p.montoAprobado}</td>
              <td>{p.plazoMeses}</td>
              <td>{p.tasaInteres}</td>
              <td>{p.fechaAprobacion ? new Date(p.fechaAprobacion).toLocaleDateString() : ''}</td>
              <td>{p.estado}</td>
              <td>
                <Link to={`/prestamos/edit/${p.prestamoID}`} className="btn btn-primary btn-sm me-2">
                  Editar
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('¿Seguro que deseas eliminar este préstamo?')) {
                      api.delete(`/prestamos/${p.prestamoID}`).then(() =>
                        setPrestamos(prestamos.filter(pre => pre.prestamoID !== p.prestamoID))
                      );
                    }
                  }}
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

export default PrestamoList;
