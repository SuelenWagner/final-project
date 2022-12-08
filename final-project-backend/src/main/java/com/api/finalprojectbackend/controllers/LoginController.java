package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
//@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> login(@RequestBody EmployeeEntity employeeEntity) throws Exception {
        Authentication authentication;
            try{
                authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(employeeEntity.getUsername(), employeeEntity.getPassword(), employeeEntity.getAuthorities()));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (BadCredentialsException e) {
                throw new Exception("Invalid credentials");
            }

            return new ResponseEntity<HttpStatus>(HttpStatus.OK);

    }
}
