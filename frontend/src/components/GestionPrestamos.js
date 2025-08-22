import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { api } from '../api';

const GestionPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    // Traer todos los préstamos
    api.get('/prestamos').then(res => setPrestamos(res.data));

    // Traer todos los clientes
    api.get('/clientes').then(res => setClientes(res.data));

    // Traer todos los pagos
    api.get('/pagos').then(res => setPagos(res.data));
  }, []);

  const calcularSaldo = (prestamoID, montoAprobado) => {
    // Filtrar los pagos correspondientes al préstamo
    const pagosPrestamo = pagos.filter(p => p.prestamoID === prestamoID);
    const totalPagado = pagosPrestamo.reduce((sum, p) => sum + parseFloat(p.montoPago), 0);
    return montoAprobado - totalPagado;
  };

  const getClienteNombre = (clienteID) => {
    const cliente = clientes.find(c => c.clienteID === clienteID);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido';
  };

  return (
    <Container className="mt-4">
      <h2>Préstamos Aprobados</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Monto Aprobado</th>
            <th>Saldo Pendiente</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(prestamo => {
            const saldo = calcularSaldo(prestamo.prestamoID, prestamo.montoAprobado);
            return (
              <tr key={prestamo.prestamoID}>
                <td>{getClienteNombre(prestamo.clienteID)}</td>
                <td>{prestamo.montoAprobado.toFixed(2)}</td>
                <td>{saldo.toFixed(2)}</td>
                <td>{saldo === 0 ? 'Pagado' : 'Pendiente'}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestionPrestamos;
