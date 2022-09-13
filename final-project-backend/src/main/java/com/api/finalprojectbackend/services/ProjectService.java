package com.api.finalprojectbackend.services;

import ch.qos.logback.core.net.server.Client;
import com.api.finalprojectbackend.dtos.ClientDTO;
import com.api.finalprojectbackend.entities.ClientEntity;
import com.api.finalprojectbackend.entities.ProjectEntity;
import com.api.finalprojectbackend.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    //service precisa acionar o repository
    @Autowired
    final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ProjectEntity save(ProjectEntity projectEntity) {
        return projectRepository.save(projectEntity);
    }

    //método declarado no repository
    public boolean existsByName(String name) {
        return projectRepository.existsByName(name);
    }

    public Page<ProjectEntity> findAll(Pageable pageable) {

        return projectRepository.findAll(pageable).map(projectEntity -> {
           Optional.ofNullable(projectEntity.getEmployees()).orElseGet(Collections::emptyList);
           Optional.ofNullable(projectEntity.getClient());
           projectEntity.setEmployees(new ArrayList<>());
           projectEntity.setClient(new ClientEntity());
           return projectEntity;
        });
    }


    public Optional<ProjectEntity> findById(UUID id) {
        return projectRepository.findById(id).map(projectEntity -> {
            Optional.ofNullable(projectEntity.getEmployees()).orElseGet(Collections::emptyList);
            Optional.ofNullable(projectEntity.getClient());
            projectEntity.setEmployees(new ArrayList<>());
            projectEntity.setClient(new ClientEntity());
            return projectEntity;
        });
    }

    @Transactional
    public void delete(ProjectEntity projectEntity) {
        projectRepository.delete(projectEntity);
    }
}
