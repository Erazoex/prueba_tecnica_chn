package com.banco.backend.controller;

import com.banco.backend.model.PlanPagos;
import com.banco.backend.repository.PlanPagoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/planpagos")
public class PlanPagoController {
    private final PlanPagoRepository repo;
    public PlanPagoController(PlanPagoRepository repo){ this.repo = repo; }

    @GetMapping
    public List<PlanPagos> all(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public PlanPagos getOne(@PathVariable Integer id){
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public PlanPagos create(@RequestBody PlanPagos p){ return repo.save(p); }

    @PutMapping("/{id}")
    public PlanPagos update(@PathVariable Integer id, @RequestBody PlanPagos p){
        p.setCuotaID(id);
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ repo.deleteById(id); }
}
