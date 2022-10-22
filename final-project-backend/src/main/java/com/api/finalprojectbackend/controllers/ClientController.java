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
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/clients")
public class ClientController {

    final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /*@PostMapping
    public ResponseEntity<Object> saveClient(@RequestBody @Valid ClientEntity clientEntity) {
        return clientService.save(clientEntity);
    }*/

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Object> saveClient(@RequestBody @Valid ClientDTO clientDTO) {

        //Seria legal criar uma classe de validação para as mensagens da aplicação
        //TODO: ver a questão de letras maiúsculas e minúsculas
        if(clientService.existsByName(clientDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Client is already registered!");
        }

        ClientEntity clientEntity = new ClientEntity();
        BeanUtils.copyProperties(clientDTO, clientEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.save(clientEntity));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
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

        //Opção 1: abaixo setar os campos que podem ser modificados!
        //ClientEntity clientEntity = clientEntityOptional.get();
        //clientEntity.setName(clientDTO.getName());
        //clientEntity.setDescription(clientDTO.getDescription());
        //clientEntity.setProjects(clientDTO.getProjects());

        //Opção 2: inserir apenas o id que o restante dos campos são atualizados:
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
