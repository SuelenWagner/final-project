package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;s
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeService {

    //service precisa acionar o repository
    @Autowired
    final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public EmployeeEntity save(EmployeeEntity employeeEntity) {
        return employeeRepository.save(employeeEntity);
    }

    //método declarado no repository
    public boolean existsByName(String name) {
        return employeeRepository.existsByName(name);
    }

    public Page<EmployeeEntity> findAll(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    public Optional<EmployeeEntity> findById(UUID id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public void delete(EmployeeEntity roleEntity) {
        employeeRepository.delete(roleEntity);
    }
}
