package com.api.finalprojectbackend.dtos;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class TechDTO {

    @NotBlank
    @Size(max = 100)
    private String name;

    private List<EmployeeEntity> employees;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<EmployeeEntity> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeEntity> employees) {
        this.employees = employees;
    }
}
