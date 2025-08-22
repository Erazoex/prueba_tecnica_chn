package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pagoID")
    private Integer pagoID;

    @Column(name = "prestamoID", nullable = false)
    private Integer prestamoID;

    @Column(name = "cuotaID")
    private Integer cuotaID;

    @Column(name = "fechaPago", nullable = false)
    private LocalDate fechaPago = LocalDate.now();

    @Column(name = "montoPago", nullable = false, precision = 18, scale = 2)
    private BigDecimal montoPago;

    @Column(name = "capitalPagado", precision = 18, scale = 2)
    private BigDecimal capitalPagado = BigDecimal.ZERO;

    @Column(name = "interesPagado", precision = 18, scale = 2)
    private BigDecimal interesPagado = BigDecimal.ZERO;

    @Column(name = "moraPagada", precision = 18, scale = 2)
    private BigDecimal moraPagada = BigDecimal.ZERO;

    // Getters y Setters
    public Integer getPagoID() { return pagoID; }
    public void setPagoID(Integer pagoID) { this.pagoID = pagoID; }

    public Integer getPrestamoID() { return prestamoID; }
    public void setPrestamoID(Integer prestamoID) { this.prestamoID = prestamoID; }

    public Integer getCuotaID() { return cuotaID; }
    public void setCuotaID(Integer cuotaID) { this.cuotaID = cuotaID; }

    public LocalDate getFechaPago() { return fechaPago; }
    public void setFechaPago(LocalDate fechaPago) { this.fechaPago = fechaPago; }

    public BigDecimal getMontoPago() { return montoPago; }
    public void setMontoPago(BigDecimal montoPago) { this.montoPago = montoPago; }

    public BigDecimal getCapitalPagado() { return capitalPagado; }
    public void setCapitalPagado(BigDecimal capitalPagado) { this.capitalPagado = capitalPagado; }

    public BigDecimal getInteresPagado() { return interesPagado; }
    public void setInteresPagado(BigDecimal interesPagado) { this.interesPagado = interesPagado; }

    public BigDecimal getMoraPagada() { return moraPagada; }
    public void setMoraPagada(BigDecimal moraPagada) { this.moraPagada = moraPagada; }
}
