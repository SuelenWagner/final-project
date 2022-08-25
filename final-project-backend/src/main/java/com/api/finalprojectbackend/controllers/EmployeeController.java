package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.EmployeeDTO;
import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.services.EmployeeService;
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
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<Object> saveEmployee(@RequestBody @Valid EmployeeDTO employeeDTO) {

        //Seria legal criar uma classe de validação para as mensagens da aplicação
        //TODO: ver a questão de letras maiúsculas e minúsculas
        if(employeeService.existsByName(employeeDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Employee is already registered!");
        }

        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employeeDTO, employeeEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.save(employeeEntity));
    }

    @GetMapping
    public ResponseEntity<Page<EmployeeEntity>> getAllEmployees(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getEmployeeById(@PathVariable(value = "id") UUID id) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(employeeModelOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable(value = "id") UUID id, @RequestBody @Valid EmployeeDTO employeeDTO) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        EmployeeEntity employeeEntity = employeeModelOptional.get();
        //Opção 1: abaixo setar os campos que podem ser modificados!
        //roleModel.setRoleTitle(roleDTO.getRoleTitle());

        //Opção 2: inserir apenas o id que o restante dos campos são atualizados:
        BeanUtils.copyProperties(employeeDTO, employeeEntity);
        employeeEntity.setId(employeeModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(employeeService.save(employeeEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable(value = "id") UUID id) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        employeeService.delete(employeeModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Employee deleted successfully!");
    }
}
