package com.api.finalprojectbackend.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RoleDTO {

    @NotBlank
    @Size(max = 40)
    private String name;

    public String getname() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
