package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.EmployeeDTO;
import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.entities.RoleEntity;
import com.api.finalprojectbackend.services.EmployeeService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1")
public class EmployeeController {

    final EmployeeService employeeService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/save")
    public ResponseEntity<Object> saveEmployee(@RequestBody @Valid EmployeeDTO employeeDTO) {
        if(employeeService.existsByEmail(employeeDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Employee is already registered!");
        }

        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employeeDTO, employeeEntity);
        employeeEntity.setPassword(passwordEncoder.encode(employeeEntity.getPassword()));
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/employee/save").toUriString());
        return ResponseEntity.created(uri).body(employeeService.save(employeeEntity));
    }

    @PostMapping("/role/save")
    public ResponseEntity<RoleEntity> saveRole(@RequestBody RoleEntity roleEntity) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/v1/role/save").toUriString());
        return ResponseEntity.created(uri).body(employeeService.saveRole(roleEntity));
    }

    @PostMapping("/role/addtoemployee")
    public ResponseEntity<?> addRoleToEmployee(@RequestBody RoleToUserForm form) {
        employeeService.addRoleToEmployee(form.getUsername(), form.getRole());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                EmployeeEntity employeeEntity = employeeService.getEmployee(username);
                String access_token = JWT.create()
                        .withSubject(employeeEntity.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) //10 minutos de duração do token
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", employeeEntity.getRoles().stream().map(RoleEntity::getRole).collect(Collectors.toList()))
                        .sign(algorithm);

                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch(Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing!");

        }
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeEntity>> getAllEmployees() {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.findAll());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/employee/{id}")
    public ResponseEntity<Object> getEmployeeById(@PathVariable(value = "id") UUID id) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(employeeModelOptional.get());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/employee/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable(value = "id") UUID id, @RequestBody @Valid EmployeeDTO employeeDTO) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        EmployeeEntity employeeEntity = employeeModelOptional.get();
        BeanUtils.copyProperties(employeeDTO, employeeEntity);
        employeeEntity.setId(employeeModelOptional.get().getId());
        employeeEntity.setPassword(passwordEncoder.encode(employeeEntity.getPassword()));

        return ResponseEntity.status(HttpStatus.OK).body(employeeService.save(employeeEntity));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable(value = "id") UUID id) {
        Optional<EmployeeEntity> employeeModelOptional = employeeService.findById(id);
        if(!employeeModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        employeeService.delete(employeeModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Employee deleted successfully!");
    }
}

@Data
class RoleToUserForm {
    private String username;
    private String role;
}
