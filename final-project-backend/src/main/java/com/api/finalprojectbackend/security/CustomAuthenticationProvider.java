package com.api.finalprojectbackend.security;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.entities.RoleEntity;
import com.api.finalprojectbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        EmployeeEntity employeeEntity = employeeRepository.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("Employee not found"));

        if (passwordEncoder.matches(password, employeeEntity.getPassword())) {
            return new UsernamePasswordAuthenticationToken(username, password, getAuthorities(employeeEntity.getRoles()));
        } else {
            throw new BadCredentialsException("Invalid credentials");
        }
    }

    private Set<SimpleGrantedAuthority> getAuthorities(Set<RoleEntity> roles) {
        Set<SimpleGrantedAuthority> list = new HashSet<>();
        for(RoleEntity role : roles) {
            list.add(new SimpleGrantedAuthority(role.getAuthority()));
        }
        return list;
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
