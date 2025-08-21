package com.banco.backend.repository;

import com.banco.backend.model.Pago; 
import org.springframework.data.jpa.repository.JpaRepository;

public interface PagoRepository extends JpaRepository<Pago, Integer> {}
