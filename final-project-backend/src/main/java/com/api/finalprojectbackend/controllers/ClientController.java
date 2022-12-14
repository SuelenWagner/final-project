package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.ClientDTO;
import com.api.finalprojectbackend.entities.ClientEntity;
import com.api.finalprojectbackend.services.ClientService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/clients")
public class ClientController {

    final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Object> saveClient(@RequestBody @Valid ClientDTO clientDTO) {
        if(clientService.existsByName(clientDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Client is already registered!");
        }

        ClientEntity clientEntity = new ClientEntity();
        BeanUtils.copyProperties(clientDTO, clientEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.save(clientEntity));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<ClientEntity>> getAllClients() {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.findAll());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getClientById(@PathVariable(value = "id") UUID id) {
        Optional<ClientEntity> clientModelOptional = clientService.findById(id);
        if(!clientModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(clientModelOptional.get());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateClient(@PathVariable(value = "id") UUID id, @RequestBody @Valid ClientDTO clientDTO) {
        Optional<ClientEntity> clientEntityOptional = clientService.findById(id);
        if(!clientEntityOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found.");
        }
        ClientEntity clientEntity = new ClientEntity();
        BeanUtils.copyProperties(clientDTO, clientEntity);
        clientEntity.setId(clientEntityOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(clientService.save(clientEntity));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteClient(@PathVariable(value = "id") UUID id) {
        Optional<ClientEntity> clientModelOptional = clientService.findById(id);
        if(!clientModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client not found.");
        }
        clientService.delete(clientModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Client deleted successfully!");
    }
}
