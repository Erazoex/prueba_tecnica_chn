package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class PlanPago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cuotaID;

    @ManyToOne
    @JoinColumn(name="prestamoID")
    private Prestamo prestamo;

    private BigDecimal montoCuota;
    private Boolean pagado;

    // Getters y Setters
    public Integer getCuotaID() { return cuotaID; }
    public void setCuotaID(Integer cuotaID) { this.cuotaID = cuotaID; }

    public Prestamo getPrestamo() { return prestamo; }
    public void setPrestamo(Prestamo prestamo) { this.prestamo = prestamo; }

    public BigDecimal getMontoCuota() { return montoCuota; }
    public void setMontoCuota(BigDecimal montoCuota) { this.montoCuota = montoCuota; }

    public Boolean getPagado() { return pagado; }
    public void setPagado(Boolean pagado) { this.pagado = pagado; }
}
