package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class EmployeeService {

    @Autowired
    final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public EmployeeEntity save(EmployeeEntity employeeEntity) {
        return employeeRepository.save(employeeEntity);
    }

    public boolean existsByEmail(String email) {
        return employeeRepository.existsByEmail(email);
    }

    @Transactional
    public List<EmployeeEntity> findAll() {
        return employeeRepository.findAll();
    }

    @Transactional
    public Optional<EmployeeEntity> findById(UUID id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public void delete(EmployeeEntity employeeEntity) {
        employeeRepository.delete(employeeEntity);
    }
}
