package com.api.finalprojectbackend.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public class ClientEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true, length = 40)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    //Ler abaixo como: Um cliente para muitos projetos
    @OneToMany(mappedBy="client")
    private List<ProjectEntity> projects;

    //Ler abaixo como: Um cliente para muitos colaboradores
    @OneToMany(mappedBy="client")
    private List<EmployeeEntity> employees;

    public ClientEntity() {
    }

    public ClientEntity(UUID id, String name, String description, List<ProjectEntity> projects, List<EmployeeEntity> employees) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.projects = projects;
        this.employees = employees;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
