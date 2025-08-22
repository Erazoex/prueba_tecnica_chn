package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Prestamos") // Nombre de tabla según SQL
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prestamoID")
    private Integer prestamoID;

    @Column(name = "solicitudID", nullable = false, unique = true)
    private Integer solicitudID;

    @Column(name = "clienteID", nullable = false)
    private Integer clienteID;

    @Column(name = "montoAprobado", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoAprobado;

    @Column(name = "tasaInteres", nullable = false, precision = 5, scale = 2)
    private BigDecimal tasaInteres;

    @Column(name = "fechaAprobacion", nullable = false)
    private LocalDate fechaAprobacion = LocalDate.now();

    @Column(nullable = false, length = 20)
    private String estado;

    // Getters y Setters
    public Integer getPrestamoID() { return prestamoID; }
    public void setPrestamoID(Integer prestamoID) { this.prestamoID = prestamoID; }

    public Integer getSolicitudID() { return solicitudID; }
    public void setSolicitudID(Integer solicitudID) { this.solicitudID = solicitudID; }

    public Integer getClienteID() { return clienteID; }
    public void setClienteID(Integer clienteID) { this.clienteID = clienteID; }

    public BigDecimal getMontoAprobado() { return montoAprobado; }
    public void setMontoAprobado(BigDecimal montoAprobado) { this.montoAprobado = montoAprobado; }

    public BigDecimal getTasaInteres() { return tasaInteres; }
    public void setTasaInteres(BigDecimal tasaInteres) { this.tasaInteres = tasaInteres; }

    public LocalDate getFechaAprobacion() { return fechaAprobacion; }
    public void setFechaAprobacion(LocalDate fechaAprobacion) { this.fechaAprobacion = fechaAprobacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
