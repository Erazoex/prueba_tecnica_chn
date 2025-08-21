package com.banco.backend.repository;

import com.banco.backend.model.Prestamo; 
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamoRepository extends JpaRepository<Prestamo, Integer> {}
