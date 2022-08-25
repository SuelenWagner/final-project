package com.api.finalprojectbackend.repositories;

import com.api.finalprojectbackend.entities.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<RoleEntity, UUID> {

    boolean existsByName(String name);
}
