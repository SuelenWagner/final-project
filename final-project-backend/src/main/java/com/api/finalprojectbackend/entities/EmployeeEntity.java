package com.api.finalprojectbackend.entities;

import com.api.finalprojectbackend.enums.EmployeeStatus;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_employee")
public class EmployeeEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true, length = 150)
    private String name;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(length = 1000)
    private String interesting;

    @Column(nullable = false)
    private EmployeeStatus status;

    //Ler abaixo como: Um colaborador possui um cargo
    @OneToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    //Ler abaixo como: Um colaborador possui muitas techs
    @ManyToMany
    @JoinTable(name = "tb_employee", joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "tech_id"))
    private List<TechEntity> techs;

    //Ler abaixo como: Muitos colaboradores para um cliente
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientEntity client;

    //Ler abaixo como: Muitos colaboradores para um projeto
    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectEntity project;

    public EmployeeEntity() {
    }

    public EmployeeEntity(UUID id, String name, Date birthDate, String email, Date startDate, String interesting,
                          EmployeeStatus status, RoleEntity role, List<TechEntity> techs, ClientEntity client,
                          ProjectEntity project) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.email = email;
        this.startDate = startDate;
        this.interesting = interesting;
        this.status = status;
        this.role = role;
        this.techs = techs;
        this.client = client;
        this.project = project;
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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getInteresting() {
        return interesting;
    }

    public void setInteresting(String interesting) {
        this.interesting = interesting;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    public RoleEntity getRole() {
        return role;
    }

    public void setRole(RoleEntity role) {
        this.role = role;
    }

    public List<TechEntity> getTechs() {
        return techs;
    }

    public void setTechs(List<TechEntity> techs) {
        this.techs = techs;
    }

    public ClientEntity getClient() {
        return client;
    }

    public void setClient(ClientEntity client) {
        this.client = client;
    }

    public ProjectEntity getProject() {
        return project;
    }

    public void setProject(ProjectEntity project) {
        this.project = project;
    }
}
