package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.entities.RoleEntity;
import com.api.finalprojectbackend.repositories.EmployeeRepository;
import com.api.finalprojectbackend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class EmployeeService implements EmployeeServiceInterface, UserDetailsService {

    @Autowired
    final EmployeeRepository employeeRepository;
    final RoleRepository roleRepository;

    public EmployeeService(EmployeeRepository employeeRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EmployeeEntity employeeEntity = employeeRepository.findByUsername(username);
        if(employeeEntity == null) {
            throw new UsernameNotFoundException("Employee not found in database");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        employeeEntity.getRoles().forEach(roleEntity -> {
            authorities.add(new SimpleGrantedAuthority(roleEntity.getRole()));
        });
        return new org.springframework.security.core.userdetails.User(employeeEntity.getUsername(), employeeEntity.getPassword(), authorities);
    }

    public EmployeeEntity save(EmployeeEntity employeeEntity) {
        return employeeRepository.save(employeeEntity);
    }

    @Override
    public RoleEntity saveRole(RoleEntity roleEntity) {
        return roleRepository.save(roleEntity);
    }

    @Override
    public void addRoleToEmployee(String username, String role) {
        EmployeeEntity employeeEntity = employeeRepository.findByUsername(username);
        RoleEntity roleEntity = roleRepository.findByRole(role);
        employeeEntity.getRoles().add(roleEntity);
    }

    public boolean existsByEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }

    public List<EmployeeEntity> findAll() {
        return employeeRepository.findAll();
    }

    public Optional<EmployeeEntity> findById(UUID id) {
        return employeeRepository.findById(id);
    }

    public void delete(EmployeeEntity employeeEntity) {
        employeeRepository.delete(employeeEntity);
    }

    public EmployeeEntity getEmployee(String username) {
        return employeeRepository.findByUsername(username);
    }
}
