package com.banco.backend.repository;

import com.banco.backend.model.SolicitudPrestamo; 
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitudPrestamoRepository extends JpaRepository<SolicitudPrestamo, Integer> {}
