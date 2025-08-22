package com.banco.backend.repository;

import com.banco.backend.model.PlanPagos; 
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanPagoRepository extends JpaRepository<PlanPagos, Integer> {}
