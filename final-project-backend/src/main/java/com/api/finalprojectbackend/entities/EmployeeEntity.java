package com.api.finalprojectbackend.entities;

import com.api.finalprojectbackend.enums.EmployeeStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmployeeStatus status;

    //Muitos colaboradores para um projeto
    //@ManyToOne(cascade=CascadeType.REFRESH)
    @ManyToOne
    @JoinColumn(name = "project_id")
    private ProjectEntity project;

    //Um colaborador possui um cargo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private PositionEntity position;

    //Um colaborador possui muitas techs
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tb_employee_techs", joinColumns = @JoinColumn(
            name = "employee_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tech_id", referencedColumnName = "id"))
    private List<TechEntity> techs;

    public EmployeeEntity() {
    }

    public EmployeeEntity(UUID id, String name, Date birthDate, String email, Date startDate, String interesting,
                          EmployeeStatus status, PositionEntity position, List<TechEntity> techs,
                          ProjectEntity project) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.email = email;
        this.startDate = startDate;
        this.interesting = interesting;
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

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    @JsonBackReference(value="employee-position")
    public PositionEntity getPosition() {
        return position;
    }

    public void setPosition(PositionEntity position) {
        this.position = position;
    }

    @JsonIgnore
    public List<TechEntity> getTechs() {
        return techs;
    }

    public void setTechs(List<TechEntity> techs) {
        this.techs = techs;
    }

    @JsonBackReference(value="project-employee")
    public ProjectEntity getProject() {
        return project;
    }

    public void setProject(ProjectEntity project) {
        this.project = project;
    }
}
