package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.EmployeeDTO;
import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.services.EmployeeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    final EmployeeService employeeService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Object> saveEmployee(@RequestBody @Valid EmployeeDTO employeeDTO) {
        if(employeeService.existsByEmail(employeeDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Employee is already registered!");
        }

        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employeeDTO, employeeEntity);
        employeeEntity.setPassword(passwordEncoder.encode(employeeEntity.getPassword()));
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.save(employeeEntity));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public ResponseEntity<List<EmployeeEntity>> getAllEmployees() {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.findAll());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<Object> getEmployeeById(@PathVariable(value = "id") UUID id) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(employeeModelOptional.get());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable(value = "id") UUID id, @RequestBody @Valid EmployeeDTO employeeDTO) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        EmployeeEntity employeeEntity = employeeModelOptional.get();
        BeanUtils.copyProperties(employeeDTO, employeeEntity);
        employeeEntity.setId(employeeModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(employeeService.save(employeeEntity));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
