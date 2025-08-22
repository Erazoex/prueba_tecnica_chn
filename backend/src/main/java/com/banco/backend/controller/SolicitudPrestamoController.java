package com.banco.backend.controller;

import com.banco.backend.model.SolicitudPrestamo;
import com.banco.backend.repository.SolicitudPrestamoRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudPrestamoController {
    private final SolicitudPrestamoRepository repo;
    public SolicitudPrestamoController(SolicitudPrestamoRepository repo){ this.repo = repo; }

    @GetMapping
    public List<SolicitudPrestamo> all(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public SolicitudPrestamo getOne(@PathVariable Integer id){
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public SolicitudPrestamo create(@RequestBody SolicitudPrestamo s){ return repo.save(s); }

    @PutMapping("/{id}")
    public SolicitudPrestamo update(@PathVariable Integer id, @RequestBody SolicitudPrestamo s){
        s.setSolicitudid(id);
        return repo.save(s);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ repo.deleteById(id); }
}
