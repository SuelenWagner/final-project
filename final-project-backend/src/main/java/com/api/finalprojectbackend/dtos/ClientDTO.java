package com.api.finalprojectbackend.dtos;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.entities.ProjectEntity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class ClientDTO {

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    @Size(max = 1000)
    private String clientDescription;

    private List<ProjectEntity> projects;

    private List<EmployeeEntity> employees;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClientDescription() {
        return clientDescription;
    }

    public void setClientDescription(String clientDescription) {
        this.clientDescription = clientDescription;
    }

    public List<ProjectEntity> getProjects() {
        return projects;
    }

    public void setProjects(List<ProjectEntity> projects) {
        this.projects = projects;
    }

    public List<EmployeeEntity> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeEntity> employees) {
        this.employees = employees;
    }
}
