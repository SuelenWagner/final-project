package com.api.finalprojectbackend.entities;

import com.api.finalprojectbackend.enums.Role;
import com.fasterxml.jackson.annotation.*;
import org.springframework.security.core.GrantedAuthority;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_role")
/*@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")*/
public class RoleEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    //@Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private String role;

    @ManyToMany(mappedBy = "roles", fetch=FetchType.EAGER)
    private List<EmployeeEntity> employees;

    /*@Override
    public String getAuthority() {
        return this.role.toString();
    }*/

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    //@JsonBackReference(value="employee-role")
    public List<EmployeeEntity> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeEntity> employees) {
        this.employees = employees;
    }
}
