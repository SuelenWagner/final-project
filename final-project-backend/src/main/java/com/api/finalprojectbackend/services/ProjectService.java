package com.api.finalprojectbackend.services;

import ch.qos.logback.core.net.server.Client;
import com.api.finalprojectbackend.dtos.ClientDTO;
import com.api.finalprojectbackend.dtos.ProjectDTO;
import com.api.finalprojectbackend.entities.ClientEntity;
import com.api.finalprojectbackend.entities.ProjectEntity;
import com.api.finalprojectbackend.repositories.ProjectRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.*;

@Service
public class ProjectService {

    //service precisa acionar o repository
    @Autowired
    final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    /*@Transactional
    public ProjectEntity save(ProjectEntity projectEntity) {
        //return projectRepository.save(projectEntity);

        //ClientEntity clientEntity = new ClientEntity();
        //projectEntity.getClient();
        //clientEntity.setProjects(new ArrayList<>());

        return projectRepository.save(projectEntity);


    }*/

    @Transactional
    public ProjectEntity save(ProjectEntity projectEntity) {
        return projectRepository.save(projectEntity);
    }

    /*public ResponseEntity<Object> save(ProjectEntity projectEntity) {
        if(projectRepository.existsByName(projectEntity.getName())) {
            return ResponseEntity.badRequest().body("The project is already created, failed to create this new project.");
        } else {
            projectEntity = new ProjectEntity();
            BeanUtils.copyProperties(projectDTO, projectEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(projectRepository.save(projectEntity));
        }

        ProjectEntity savedProject = projectRepository.save(projectEntity);
        if(projectRepository.findById(savedProject.getId()).isPresent())
            return ResponseEntity.ok("Project created successfully!");
        else return ResponseEntity.unprocessableEntity().body("Failed creating project.");
    }*/


    /*@Transactional
    public ResponseEntity<Object> save(@RequestBody @Valid ProjectDTO projectDTO) {

        //Seria legal criar uma classe de validação para as mensagens da aplicação
        //TODO: ver a questão de letras maiúsculas e minúsculas
        if(projectRepository.existsByName(projectDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Project is already registered!");
        }

        ProjectEntity projectEntity = new ProjectEntity();
        BeanUtils.copyProperties(projectDTO, projectEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(projectRepository.save(projectEntity));
    }*/



    //método declarado no repository
    public boolean existsByName(String name) {
        return projectRepository.existsByName(name);
    }

    /*public Page<ProjectEntity> findAll(Pageable pageable) {

        return projectRepository.findAll(pageable).map(projectEntity -> {
           Optional.ofNullable(projectEntity.getEmployees()).orElseGet(Collections::emptyList);
           Optional.ofNullable(projectEntity.getClient());
           projectEntity.setEmployees(new ArrayList<>());
           projectEntity.setClient(new ClientEntity());


//           ClientEntity clientEntity = new ClientEntity();
//           clientEntity.setId(clientEntity.getId());
//           clientEntity.setName(clientEntity.getName());
//           clientEntity.setDescription(clientEntity.getDescription());

           return projectEntity;
        });
    }*/

    @Transactional
    public List<ProjectEntity> findAll() {
        return projectRepository.findAll();
    }


    /*public Optional<ProjectEntity> findById(UUID id) {
        return projectRepository.findById(id).map(projectEntity -> {
            Optional.ofNullable(projectEntity.getEmployees()).orElseGet(Collections::emptyList);
            Optional.ofNullable(projectEntity.getClient());
            projectEntity.setEmployees(new ArrayList<>());
            projectEntity.setClient(new ClientEntity());
            projectEntity.getClient();
            projectEntity.getEmployees();
            return projectEntity;
        });
    }*/

    @Transactional
    public Optional<ProjectEntity> findById(UUID id) {
        return projectRepository.findById(id);
    }

    @Transactional
    public void delete(ProjectEntity projectEntity) {
        projectRepository.delete(projectEntity);
    }
}
