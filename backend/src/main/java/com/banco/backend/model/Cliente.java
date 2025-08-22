package com.banco.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer clienteid;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "apellido", nullable = false, length = 100)
    private String apellido;

    @Column(name = "numero_identificacion", nullable = false, unique = true, length = 50)
    private String numero_identificacion;

    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fecha_nacimiento;

    @Column(name = "direccion", length = 255)
    private String direccion;

    @Column(name = "correo", unique = true, length = 100)
    private String correo;

    @Column(name = "telefono", length = 20)
    private String telefono;

    // Getters y Setters
    public Integer getClienteid() { return clienteid; }
    public void setClienteid(Integer clienteid) { this.clienteid = clienteid; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getNumero_identificacion() { return numero_identificacion; }
    public void setNumero_identificacion(String numero_identificacion) { this.numero_identificacion = numero_identificacion; }

    public LocalDate getFecha_nacimiento() { return fecha_nacimiento; }
    public void setFecha_nacimiento(LocalDate fecha_nacimiento) { this.fecha_nacimiento = fecha_nacimiento; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
}
