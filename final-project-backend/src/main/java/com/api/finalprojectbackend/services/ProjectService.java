package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.ProjectEntity;
import com.api.finalprojectbackend.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class ProjectService {

    @Autowired
    final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ProjectEntity save(ProjectEntity projectEntity) {
        return projectRepository.save(projectEntity);
    }

    public boolean existsByName(String name) {
        return projectRepository.existsByName(name);
    }

    @Transactional
    public List<ProjectEntity> findAll() {
        return projectRepository.findAll();
    }

    @Transactional
    public Optional<ProjectEntity> findById(UUID id) {
        return projectRepository.findById(id);
    }

    @Transactional
    public void delete(ProjectEntity projectEntity) {
        projectRepository.delete(projectEntity);
    }
}
