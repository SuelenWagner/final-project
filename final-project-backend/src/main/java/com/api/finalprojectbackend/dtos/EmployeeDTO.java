package com.api.finalprojectbackend.dtos;

import com.api.finalprojectbackend.entities.ProjectEntity;
import com.api.finalprojectbackend.entities.PositionEntity;
import com.api.finalprojectbackend.entities.RoleEntity;
import com.api.finalprojectbackend.entities.TechEntity;
import com.api.finalprojectbackend.enums.EmployeeStatus;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

public class EmployeeDTO {

    @NotNull
    @NotBlank
    private String username;

    @NotNull
    @NotBlank
    private String password;

    @NotNull
    @NotBlank
    @Size(max = 150)
    private String fullName;

    private Date birthDate;

    @NotNull
    private String email;

    private Date startDate;

    @Size(max = 1000)
    private String interesting;

    @Enumerated(EnumType.STRING)
    private EmployeeStatus status;

    private PositionEntity position;

    private List<TechEntity> techs;

    private ProjectEntity project;

    @NotNull
    private List<RoleEntity> roles;


    public String getUsername() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public List<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleEntity> roles) {
        this.roles = roles;
    }
}
