package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pagoID;

    @ManyToOne
    @JoinColumn(name="cuotaID")
    private PlanPago planPago;

    private BigDecimal monto;
    private LocalDate fechaPago;

    // Getters y Setters
    public Integer getPagoID() { return pagoID; }
    public void setPagoID(Integer pagoID) { this.pagoID = pagoID; }

    public PlanPago getPlanPago() { return planPago; }
    public void setPlanPago(PlanPago planPago) { this.planPago = planPago; }

    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }

    public LocalDate getFechaPago() { return fechaPago; }
    public void setFechaPago(LocalDate fechaPago) { this.fechaPago = fechaPago; }
}
