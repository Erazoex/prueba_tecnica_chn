package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Planpagos")
public class PlanPagos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cuotaID")
    private Integer cuotaID;

    @Column(name = "prestamoID", nullable = false)
    private Integer prestamoID;

    @Column(name = "numeroCuota", nullable = false)
    private Integer numeroCuota;

    @Column(name = "fechaVencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @Column(name = "montoCuota", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoCuota;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal capital;

    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal interes;

    @Column(nullable = false, length = 20)
    private String estado;

    // Getters y Setters
    public Integer getCuotaID() { return cuotaID; }
    public void setCuotaID(Integer cuotaID) { this.cuotaID = cuotaID; }

    public Integer getPrestamoID() { return prestamoID; }
    public void setPrestamoID(Integer prestamoID) { this.prestamoID = prestamoID; }

    public Integer getNumeroCuota() { return numeroCuota; }
    public void setNumeroCuota(Integer numeroCuota) { this.numeroCuota = numeroCuota; }

    public LocalDate getFechaVencimiento() { return fechaVencimiento; }
    public void setFechaVencimiento(LocalDate fechaVencimiento) { this.fechaVencimiento = fechaVencimiento; }

    public BigDecimal getMontoCuota() { return montoCuota; }
    public void setMontoCuota(BigDecimal montoCuota) { this.montoCuota = montoCuota; }

    public BigDecimal getCapital() { return capital; }
    public void setCapital(BigDecimal capital) { this.capital = capital; }

    public BigDecimal getInteres() { return interes; }
    public void setInteres(BigDecimal interes) { this.interes = interes; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
