package com.api.finalprojectbackend.repositories;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public class EmployeeRepository extends JpaRepository<EmployeeEntity, UUID> {

    boolean existsByName(String name);
}