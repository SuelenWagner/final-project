package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.entities.ProjectEntity;
import com.api.finalprojectbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

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

    /*public Page<EmployeeEntity> findAll(Pageable pageable) {
        return employeeRepository.findAll(pageable).map(employeeEntity -> {
            Optional.ofNullable(employeeEntity.getProject());
            employeeEntity.setProject(new ProjectEntity());
            Optional.ofNullable(employeeEntity.getTechs()).orElseGet(Collections::emptyList);
            employeeEntity.setTechs(new ArrayList<>());
            return employeeEntity;
        });
        //return employeeRepository.findAll(pageable);
    }*/

    @Transactional
    public List<EmployeeEntity> findAll() {
        return employeeRepository.findAll();
    }

    /*public Optional<EmployeeEntity> findById(UUID id) {
        return employeeRepository.findById(id).map(employeeEntity -> {
            Optional.ofNullable(employeeEntity.getProject());
            employeeEntity.setProject(new ProjectEntity());
            Optional.ofNullable(employeeEntity.getTechs()).orElseGet(Collections::emptyList);
            employeeEntity.setTechs(new ArrayList<>());
            return employeeEntity;
        });
    }*/

    @Transactional
    public Optional<EmployeeEntity> findById(UUID id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public void delete(EmployeeEntity roleEntity) {
        employeeRepository.delete(roleEntity);
    }
}
