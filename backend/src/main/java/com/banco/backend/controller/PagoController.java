package com.banco.backend.controller;

import com.banco.backend.model.Pago;
import com.banco.backend.repository.PagoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {
    private final PagoRepository repo;
    public PagoController(PagoRepository repo){ this.repo = repo; }

    @GetMapping
    public List<Pago> all(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public Pago getOne(@PathVariable Integer id){
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Pago create(@RequestBody Pago p){ return repo.save(p); }

    @PutMapping("/{id}")
    public Pago update(@PathVariable Integer id, @RequestBody Pago p){
        p.setPagoid(id);
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ repo.deleteById(id); }
}
