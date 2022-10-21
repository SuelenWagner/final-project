package com.api.finalprojectbackend.repositories;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<EmployeeEntity, UUID> {

    Optional<EmployeeEntity> findByUsername(String username);
    boolean existsByEmail(String email);
}
