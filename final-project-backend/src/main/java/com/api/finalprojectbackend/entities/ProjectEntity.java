package com.api.finalprojectbackend.entities;

import com.api.finalprojectbackend.enums.ProjectStatus;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_project")
public class ProjectEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true, length = 40)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date finishDate;

    @Column(nullable = false)
    private ProjectStatus status;

    //Ler abaixo como: Muitos projetos para um cliente
    @ManyToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "client_id")
    private ClientEntity client;


    //Ler abaixo como: Um projeto para muitos colaboradores
    @OneToMany(mappedBy="project")
    private List<EmployeeEntity> employees;


    public ProjectEntity() {
    }

    public ProjectEntity(UUID id, String name, String description, Date startDate, Date finishDate, ProjectStatus status, ClientEntity client, List<EmployeeEntity> employees) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.status = status;
        this.client = client;
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
    }

    public List<EmployeeEntity> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeEntity> employees) {
        this.employees = employees;
    }
}
