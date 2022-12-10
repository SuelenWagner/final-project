package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.entities.RoleEntity;
import java.util.List;

public interface EmployeeServiceInterface {
    //EmployeeEntity saveEmployee(EmployeeEntity employeeEntity);
    RoleEntity saveRole(RoleEntity roleEntity);
    void addRoleToEmployee(String username, String role);
    //EmployeeEntity getEmployee(String username);
    //List<EmployeeEntity> getEmployees();
}
