package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.PositionDTO;
import com.api.finalprojectbackend.entities.PositionEntity;
import com.api.finalprojectbackend.services.PositionService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
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

    @PostMapping
    public ResponseEntity<Object> saveRole(@RequestBody @Valid PositionDTO positionDTO) {

        //Seria legal criar uma classe de validação para as mensagens da aplicação
        //TODO: ver a questão de letras maiúsculas e minúsculas
        if(positionService.existsByName(positionDTO.getname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Position is already registered!");
        }

        PositionEntity positionEntity = new PositionEntity();
        BeanUtils.copyProperties(positionDTO, positionEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(positionService.save(positionEntity));
    }

    @GetMapping
    public ResponseEntity<Page<PositionEntity>> getAllRoles(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(positionService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getRoleById(@PathVariable(value = "id") UUID id) {
        Optional<PositionEntity> roleModelOptional = positionService.findById(id);
        if(!roleModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Position not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(roleModelOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateRole(@PathVariable(value = "id") UUID id, @RequestBody @Valid PositionDTO positionDTO) {
        Optional<PositionEntity> roleModelOptional = positionService.findById(id);
        if(!roleModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Position not found.");
        }
        PositionEntity positionEntity = roleModelOptional.get();
        //Opção 1: abaixo setar os campos que podem ser modificados!
        //roleModel.setRoleTitle(roleDTO.getRoleTitle());

        //Opção 2: inserir apenas o id que o restante dos campos são atualizados:
        BeanUtils.copyProperties(positionDTO, positionEntity);
        positionEntity.setId(roleModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(positionService.save(positionEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRole(@PathVariable(value = "id") UUID id) {
        Optional<PositionEntity> roleModelOptional = positionService.findById(id);
        if(!roleModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Position not found.");
        }
        positionService.delete(roleModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Position deleted successfully!");
    }
}
