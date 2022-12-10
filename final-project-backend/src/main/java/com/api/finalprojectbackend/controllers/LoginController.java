package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.LoginRequestDto;
import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.security.CustomAuthenticationFilter;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class LoginController {

   /*@Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> login(@RequestBody EmployeeEntity employeeEntity) throws Exception {
        Authentication authentication;
            try{
                authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(employeeEntity.getUsername(), employeeEntity.getPassword()));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (BadCredentialsException e) {
                throw new Exception("Invalid credentials");
            }

            return new ResponseEntity<HttpStatus>(HttpStatus.OK);

    }

/*    AuthenticationManager authenticationManager;

    @Autowired
    CustomAuthenticationFilter customAuthenticationFilter;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequestDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt =

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }*/

}
