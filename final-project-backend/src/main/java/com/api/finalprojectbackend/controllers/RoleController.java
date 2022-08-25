package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.RoleDTO;
import com.api.finalprojectbackend.entities.RoleEntity;
import com.api.finalprojectbackend.services.RoleService;
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
@RequestMapping("/api/v1/roles")
public class RoleController {

    final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<Object> saveRole(@RequestBody @Valid RoleDTO roleDTO) {

        //Seria legal criar uma classe de validação para as mensagens da aplicação
        //TODO: ver a questão de letras maiúsculas e minúsculas
        if(roleService.existsByName(roleDTO.getname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Role is already registered!");
        }

        RoleEntity roleEntity = new RoleEntity();
        BeanUtils.copyProperties(roleDTO, roleEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(roleService.save(roleEntity));
    }

    @GetMapping
    public ResponseEntity<Page<RoleEntity>> getAllRoles(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(roleService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getRoleById(@PathVariable(value = "id") UUID id) {
        Optional<RoleEntity> roleModelOptional = roleService.findById(id);
        if(!roleModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Role not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(roleModelOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateRole(@PathVariable(value = "id") UUID id, @RequestBody @Valid RoleDTO roleDTO) {
        Optional<RoleEntity> roleModelOptional = roleService.findById(id);
        if(!roleModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Role not found.");
        }
        RoleEntity roleEntity = roleModelOptional.get();
        //Opção 1: abaixo setar os campos que podem ser modificados!
        //roleModel.setRoleTitle(roleDTO.getRoleTitle());

        //Opção 2: inserir apenas o id que o restante dos campos são atualizados:
        BeanUtils.copyProperties(roleDTO, roleEntity);
        roleEntity.setId(roleModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(roleService.save(roleEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRole(@PathVariable(value = "id") UUID id) {
        Optional<RoleEntity> roleModelOptional = roleService.findById(id);
        if(!roleModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Role not found.");
        }
        roleService.delete(roleModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Role deleted successfully!");
    }
}
