package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.PositionDTO;
import com.api.finalprojectbackend.entities.PositionEntity;
import com.api.finalprojectbackend.services.PositionService;
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
@RequestMapping("/api/v1/positions")
public class PositionController {

    final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Object> savePosition(@RequestBody @Valid PositionDTO positionDTO) {
        if(positionService.existsByName(positionDTO.getname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Position is already registered!");
        }

        PositionEntity positionEntity = new PositionEntity();
        BeanUtils.copyProperties(positionDTO, positionEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(positionService.save(positionEntity));
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<PositionEntity>> getAllPositions() {
        return ResponseEntity.status(HttpStatus.OK).body(positionService.findAll());
    }

    //@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getPositionById(@PathVariable(value = "id") UUID id) {
        Optional<PositionEntity> positionModelOptional = positionService.findById(id);
        if(!positionModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Position not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(positionModelOptional.get());
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePosition(@PathVariable(value = "id") UUID id, @RequestBody @Valid PositionDTO positionDTO) {
        Optional<PositionEntity> positionModelOptional = positionService.findById(id);
        if(!positionModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Position not found.");
        }
        PositionEntity positionEntity = positionModelOptional.get();
        BeanUtils.copyProperties(positionDTO, positionEntity);
        positionEntity.setId(positionModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(positionService.save(positionEntity));
    }

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePosition(@PathVariable(value = "id") UUID id) {
        Optional<PositionEntity> positionModelOptional = positionService.findById(id);
        if(!positionModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Position not found.");
        }
        positionService.delete(positionModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Position deleted successfully!");
    }
}
