package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "plan_pagos")
public class PlanPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cuotaid")
    private Integer cuotaid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prestamoid", nullable = false)
    private Prestamo prestamo;

    @Column(name = "numero_cuota", nullable = false)
    private Integer numero_cuota;

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fecha_vencimiento;

    @Column(name = "monto_cuota", nullable = false, precision = 18, scale = 2)
    private BigDecimal monto_cuota;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal capital;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal interes;

    @Column(nullable = false, length = 20)
    private String estado;

    @OneToMany(mappedBy = "plan_pago")
    private List<Pago> pagos;

    // Getters y Setters
    public Integer getCuotaid() { return cuotaid; }
    public void setCuotaid(Integer cuotaid) { this.cuotaid = cuotaid; }

    public Prestamo getPrestamo() { return prestamo; }
    public void setPrestamo(Prestamo prestamo) { this.prestamo = prestamo; }

    public Integer getNumero_cuota() { return numero_cuota; }
    public void setNumero_cuota(Integer numero_cuota) { this.numero_cuota = numero_cuota; }

    public LocalDate getFecha_vencimiento() { return fecha_vencimiento; }
    public void setFecha_vencimiento(LocalDate fecha_vencimiento) { this.fecha_vencimiento = fecha_vencimiento; }

    public BigDecimal getMonto_cuota() { return monto_cuota; }
    public void setMonto_cuota(BigDecimal monto_cuota) { this.monto_cuota = monto_cuota; }

    public BigDecimal getCapital() { return capital; }
    public void setCapital(BigDecimal capital) { this.capital = capital; }

    public BigDecimal getInteres() { return interes; }
    public void setInteres(BigDecimal interes) { this.interes = interes; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public List<Pago> getPagos() { return pagos; }
    public void setPagos(List<Pago> pagos) { this.pagos = pagos; }
}
