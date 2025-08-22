import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const PagoForm = () => {
  const [pago, setPago] = useState({
    prestamoID: "",
    cuotaID: "",
    fechaPago: "",
    montoPago: "",
    capitalPagado: 0,
    interesPagado: 0,
    moraPagada: 0,
  });

  const [prestamos, setPrestamos] = useState([]);
  const [cuotas, setCuotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Traer préstamos y cuotas disponibles
    api.get("/prestamos").then((res) => setPrestamos(res.data));
    api.get("/planpagos").then((res) => setCuotas(res.data));
  }, []);

  const handleChange = (e) => {
    setPago({ ...pago, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/pagos", pago).then(() => navigate("/pagos"));
  };

  return (
    <Container>
      <h2>Registrar Pago</h2>
      <Form onSubmit={handleSubmit}>
        {/* Préstamo */}
        <Form.Group className="mb-3">
          <Form.Label>Préstamo</Form.Label>
          <Form.Select
            name="prestamoID"
            value={pago.prestamoID}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un préstamo</option>
            {prestamos.map((p) => (
              <option key={p.prestamoID} value={p.prestamoID}>
                {p.prestamoID} - Cliente {p.clienteID}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Cuota (opcional) */}
        <Form.Group className="mb-3">
          <Form.Label>Cuota (opcional)</Form.Label>
          <Form.Select
            name="cuotaID"
            value={pago.cuotaID}
            onChange={handleChange}
          >
            <option value="">Sin cuota</option>
            {cuotas.map((c) => (
              <option key={c.cuotaID} value={c.cuotaID}>
                {c.cuotaID} - Préstamo {c.prestamoID} - Cuota {c.numeroCuota}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Fecha de pago */}
        <Form.Group className="mb-3">
          <Form.Label>Fecha de pago</Form.Label>
          <Form.Control
            type="date"
            name="fechaPago"
            value={pago.fechaPago}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Monto Pagado */}
        <Form.Group className="mb-3">
          <Form.Label>Monto pagado</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="montoPago"
            value={pago.montoPago}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Capital Pagado */}
        <Form.Group className="mb-3">
          <Form.Label>Capital pagado</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="capitalPagado"
            value={pago.capitalPagado}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Interés Pagado */}
        <Form.Group className="mb-3">
          <Form.Label>Interés pagado</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="interesPagado"
            value={pago.interesPagado}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Mora Pagada */}
        <Form.Group className="mb-3">
          <Form.Label>Mora pagada</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="moraPagada"
            value={pago.moraPagada}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </Container>
  );
};

export default PagoForm;
