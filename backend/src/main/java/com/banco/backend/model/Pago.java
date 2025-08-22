package com.banco.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pagoid")
    private Integer pagoid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prestamoid", nullable = false)
    private Prestamo prestamo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuotaid")
    private PlanPago plan_pago;

    @Column(name = "fecha_pago", nullable = false)
    private LocalDate fecha_pago = LocalDate.now();

    @Column(name = "monto_pago", nullable = false, precision = 18, scale = 2)
    private BigDecimal monto_pago;

    @Column(name = "capital_pagado", precision = 18, scale = 2)
    private BigDecimal capital_pagado = BigDecimal.ZERO;

    @Column(name = "interes_pagado", precision = 18, scale = 2)
    private BigDecimal interes_pagado = BigDecimal.ZERO;

    @Column(name = "mora_pagada", precision = 18, scale = 2)
    private BigDecimal mora_pagada = BigDecimal.ZERO;

    // Getters y Setters
    public Integer getPagoid() { return pagoid; }
    public void setPagoid(Integer pagoid) { this.pagoid = pagoid; }

    public Prestamo getPrestamo() { return prestamo; }
    public void setPrestamo(Prestamo prestamo) { this.prestamo = prestamo; }

    public PlanPago getPlan_pago() { return plan_pago; }
    public void setPlan_pago(PlanPago plan_pago) { this.plan_pago = plan_pago; }

    public LocalDate getFecha_pago() { return fecha_pago; }
    public void setFecha_pago(LocalDate fecha_pago) { this.fecha_pago = fecha_pago; }

    public BigDecimal getMonto_pago() { return monto_pago; }
    public void setMonto_pago(BigDecimal monto_pago) { this.monto_pago = monto_pago; }

    public BigDecimal getCapital_pagado() { return capital_pagado; }
    public void setCapital_pagado(BigDecimal capital_pagado) { this.capital_pagado = capital_pagado; }

    public BigDecimal getInteres_pagado() { return interes_pagado; }
    public void setInteres_pagado(BigDecimal interes_pagado) { this.interes_pagado = interes_pagado; }

    public BigDecimal getMora_pagada() { return mora_pagada; }
    public void setMora_pagada(BigDecimal mora_pagada) { this.mora_pagada = mora_pagada; }
}
