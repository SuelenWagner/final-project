package com.api.finalprojectbackend.repositories;

import com.api.finalprojectbackend.entities.RoleEntity;
import com.api.finalprojectbackend.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository  extends JpaRepository<RoleEntity, Long> {

    Optional<RoleEntity> findByName(ERole name);

}
