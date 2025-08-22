package com.banco.backend.controller;

import com.banco.backend.model.Cliente;
import com.banco.backend.repository.ClienteRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    private final ClienteRepository repo;
    public ClienteController(ClienteRepository repo){ this.repo = repo; }

    @GetMapping
    public List<Cliente> all(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public Cliente getOne(@PathVariable Integer id){
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Cliente create(@RequestBody Cliente c){ return repo.save(c); }

    @PutMapping("/{id}")
    public Cliente update(@PathVariable Integer id, @RequestBody Cliente c){
        c.setClienteid(id);
        return repo.save(c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){ repo.deleteById(id); }
}
