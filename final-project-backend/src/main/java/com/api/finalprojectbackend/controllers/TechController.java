package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.TechDTO;
import com.api.finalprojectbackend.entities.TechEntity;
import com.api.finalprojectbackend.services.TechService;
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
@RequestMapping("/api/v1/techs")
public class TechController {

    final TechService techService;

    public TechController(TechService techService) {
        this.techService = techService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Object> saveTech(@RequestBody @Valid TechDTO techDTO) {
        if(techService.existsByName(techDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Tech is already registered!");
        }

        TechEntity techEntity = new TechEntity();
        BeanUtils.copyProperties(techDTO, techEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(techService.save(techEntity));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<TechEntity>> getAllTechs() {
        return ResponseEntity.status(HttpStatus.OK).body(techService.findAll());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getTechById(@PathVariable(value = "id") UUID id) {
        Optional<TechEntity> techModelOptional = techService.findById(id);
        if(!techModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tech not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(techModelOptional.get());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTech(@PathVariable(value = "id") UUID id, @RequestBody @Valid TechDTO techDTO) {
        Optional<TechEntity> techModelOptional = techService.findById(id);
        if(!techModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tech not found.");
        }
        TechEntity techEntity = techModelOptional.get();
        techEntity.setName(techDTO.getName());

        return ResponseEntity.status(HttpStatus.OK).body(techService.save(techEntity));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTech(@PathVariable(value = "id") UUID id) {
        Optional<TechEntity> techModelOptional = techService.findById(id);
        if(!techModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tech not found.");
        }
        techService.delete(techModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Tech deleted successfully!");
    }
}
