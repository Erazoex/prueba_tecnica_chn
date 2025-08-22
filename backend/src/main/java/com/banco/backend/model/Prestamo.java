package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "prestamos")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prestamoid")
    private Integer prestamoid;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "solicitudid", unique = true, nullable = false)
    private SolicitudPrestamo solicitud;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clienteid", nullable = false)
    private Cliente cliente;

    @Column(name = "monto_aprobado", nullable = false, precision = 18, scale = 2)
    private BigDecimal monto_aprobado;

    @Column(name = "tasa_interes", nullable = false, precision = 5, scale = 2)
    private BigDecimal tasa_interes;

    @Column(name = "fecha_aprobacion", nullable = false)
    private LocalDate fecha_aprobacion = LocalDate.now();

    @Column(nullable = false, length = 20)
    private String estado;

    @OneToMany(mappedBy = "prestamo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlanPago> plan_pagos;

    @OneToMany(mappedBy = "prestamo")
    private List<Pago> pagos;

    // Getters y Setters
    public Integer getPrestamoid() { return prestamoid; }
    public void setPrestamoid(Integer prestamoid) { this.prestamoid = prestamoid; }

    public SolicitudPrestamo getSolicitud() { return solicitud; }
    public void setSolicitud(SolicitudPrestamo solicitud) { this.solicitud = solicitud; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public BigDecimal getMonto_aprobado() { return monto_aprobado; }
    public void setMonto_aprobado(BigDecimal monto_aprobado) { this.monto_aprobado = monto_aprobado; }

    public BigDecimal getTasa_interes() { return tasa_interes; }
    public void setTasa_interes(BigDecimal tasa_interes) { this.tasa_interes = tasa_interes; }

    public LocalDate getFecha_aprobacion() { return fecha_aprobacion; }
    public void setFecha_aprobacion(LocalDate fecha_aprobacion) { this.fecha_aprobacion = fecha_aprobacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public List<PlanPago> getPlan_pagos() { return plan_pagos; }
    public void setPlan_pagos(List<PlanPago> plan_pagos) { this.plan_pagos = plan_pagos; }

    public List<Pago> getPagos() { return pagos; }
    public void setPagos(List<Pago> pagos) { this.pagos = pagos; }
}
