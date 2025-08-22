package com.banco.backend.controller;

import com.banco.backend.model.Prestamo;
import com.banco.backend.repository.PrestamoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {
    private final PrestamoRepository repo;
    public PrestamoController(PrestamoRepository repo){ this.repo = repo; }

    @GetMapping
    public List<Prestamo> all(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public Prestamo getOne(@PathVariable Integer id){
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Prestamo create(@RequestBody Prestamo p){ return repo.save(p); }

    @PutMapping("/{id}")
    public Prestamo update(@PathVariable Integer id, @RequestBody Prestamo p){
        p.setPrestamoID(id);
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ repo.deleteById(id); }
}
