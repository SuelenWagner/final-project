package com.api.finalprojectbackend.repositories;

import com.api.finalprojectbackend.entities.TechEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public class TechRepository extends JpaRepository<TechEntity, UUID> {

    boolean existsByName(String name);
}
