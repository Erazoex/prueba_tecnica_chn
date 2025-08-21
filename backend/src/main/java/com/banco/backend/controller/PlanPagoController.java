package com.banco.backend.controller;

import com.banco.backend.model.PlanPago;
import com.banco.backend.repository.PlanPagoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/planpagos")
public class PlanPagoController {
    private final PlanPagoRepository repo;
    public PlanPagoController(PlanPagoRepository repo){ this.repo = repo; }

    @GetMapping
    public List<PlanPago> all(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public PlanPago getOne(@PathVariable Integer id){
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public PlanPago create(@RequestBody PlanPago p){ return repo.save(p); }

    @PutMapping("/{id}")
    public PlanPago update(@PathVariable Integer id, @RequestBody PlanPago p){
        p.setCuotaID(id);
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ repo.deleteById(id); }
}
