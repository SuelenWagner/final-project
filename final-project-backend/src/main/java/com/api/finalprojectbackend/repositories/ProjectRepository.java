package com.api.finalprojectbackend.repositories;

import com.api.finalprojectbackend.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public class ProjectRepository extends JpaRepository<ProjectEntity, UUID> {
    boolean existsByName(String name);
}
