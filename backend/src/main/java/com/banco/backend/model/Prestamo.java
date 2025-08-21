package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prestamoID;

    @OneToOne
    @JoinColumn(name="solicitudID")
    private SolicitudPrestamo solicitud;

    @ManyToOne
    @JoinColumn(name="clienteID")
    private Cliente cliente;

    private BigDecimal montoTotal;
    private BigDecimal saldoPendiente;

    // Getters y Setters
    public Integer getPrestamoID() { return prestamoID; }
    public void setPrestamoID(Integer prestamoID) { this.prestamoID = prestamoID; }

    public SolicitudPrestamo getSolicitud() { return solicitud; }
    public void setSolicitud(SolicitudPrestamo solicitud) { this.solicitud = solicitud; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public BigDecimal getMontoTotal() { return montoTotal; }
    public void setMontoTotal(BigDecimal montoTotal) { this.montoTotal = montoTotal; }

    public BigDecimal getSaldoPendiente() { return saldoPendiente; }
    public void setSaldoPendiente(BigDecimal saldoPendiente) { this.saldoPendiente = saldoPendiente; }
}
