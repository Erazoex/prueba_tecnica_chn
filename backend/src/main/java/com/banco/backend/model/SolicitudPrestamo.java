package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class SolicitudPrestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer solicitudID;

    @ManyToOne
    @JoinColumn(name="clienteID")
    private Cliente cliente;

    private BigDecimal montoSolicitado;
    private Integer plazoMeses;
    private String estado; // Pendiente, Aprobado, Rechazado

    // Getters y Setters
    public Integer getSolicitudID() { return solicitudID; }
    public void setSolicitudID(Integer solicitudID) { this.solicitudID = solicitudID; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public BigDecimal getMontoSolicitado() { return montoSolicitado; }
    public void setMontoSolicitado(BigDecimal montoSolicitado) { this.montoSolicitado = montoSolicitado; }

    public Integer getPlazoMeses() { return plazoMeses; }
    public void setPlazoMeses(Integer plazoMeses) { this.plazoMeses = plazoMeses; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
