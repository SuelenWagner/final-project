package com.api.finalprojectbackend.entities;

import com.api.finalprojectbackend.enums.EmployeeStatus;
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

    @Column(nullable = false, length = 150)
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
    private boolean isManager;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmployeeStatus status;

    //Um colaborador possui um cargo
    @ManyToOne
    @JoinColumn(name = "position_id")
    private PositionEntity position;

    //Ler abaixo como: Um colaborador possui muitas techs
    /*@ManyToMany
    @JoinTable(name = "tb_employee", joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "tech_id"))
    private List<TechEntity> techs;*/


    @ManyToMany(cascade=CascadeType.PERSIST)
    @JoinTable(name = "tb_employee_techs", joinColumns = @JoinColumn(
            name = "employee_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tech_id", referencedColumnName = "id"))
    private List<TechEntity> techs;


    //Muitos colaboradores para um projeto
    @ManyToOne(cascade=CascadeType.REFRESH)
    @JoinColumn(name = "project_id")
    private ProjectEntity project;

    public EmployeeEntity() {
    }

    public EmployeeEntity(UUID id, String name, Date birthDate, String email, Date startDate, String interesting,
                          boolean isManager, EmployeeStatus status, PositionEntity position, List<TechEntity> techs,
                          ProjectEntity project) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.email = email;
        this.startDate = startDate;
        this.interesting = interesting;
        this.isManager = isManager;
        this.status = status;
        this.position = position;
        this.techs = techs;
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

    public boolean isManager() {
        return isManager;
    }

    public void setManager(boolean manager) {
        isManager = manager;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    public PositionEntity getPosition() {
        return position;
    }

    public void setPosition(PositionEntity position) {
        this.position = position;
    }

    public List<TechEntity> getTechs() {
        return techs;
    }

    public void setTechs(List<TechEntity> techs) {
        this.techs = techs;
    }

    public ProjectEntity getProject() {
        return project;
    }

    public void setProject(ProjectEntity project) {
        this.project = project;
    }
}
