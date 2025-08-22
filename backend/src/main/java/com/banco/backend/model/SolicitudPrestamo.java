package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "solicitudes_prestamo")
public class SolicitudPrestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solicitudid")
    private Integer solicitudid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clienteid", nullable = false)
    private Cliente cliente;

    @Column(name = "monto_solicitado", nullable = false, precision = 18, scale = 2)
    private BigDecimal monto_solicitado;

    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDateTime fecha_solicitud = LocalDateTime.now();

    @Column(nullable = false, length = 20)
    private String estado;

    @Column(length = 255)
    private String observaciones;

    @OneToOne(mappedBy = "solicitud")
    private Prestamo prestamo;

    // Getters y Setters
    public Integer getSolicitudid() { return solicitudid; }
    public void setSolicitudid(Integer solicitudid) { this.solicitudid = solicitudid; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public BigDecimal getMonto_solicitado() { return monto_solicitado; }
    public void setMonto_solicitado(BigDecimal monto_solicitado) { this.monto_solicitado = monto_solicitado; }

    public LocalDateTime getFecha_solicitud() { return fecha_solicitud; }
    public void setFecha_solicitud(LocalDateTime fecha_solicitud) { this.fecha_solicitud = fecha_solicitud; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public Prestamo getPrestamo() { return prestamo; }
    public void setPrestamo(Prestamo prestamo) { this.prestamo = prestamo; }
}
