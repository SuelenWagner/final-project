package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.ClientDTO;
import com.api.finalprojectbackend.dtos.ProjectDTO;
import com.api.finalprojectbackend.entities.ClientEntity;
import com.api.finalprojectbackend.entities.ProjectEntity;
import com.api.finalprojectbackend.services.ProjectService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/projects")
public class ProjectController {

    final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<Object> saveProject(@RequestBody @Valid ProjectDTO projectDTO) {

        //Seria legal criar uma classe de validação para as mensagens da aplicação
        //TODO: ver a questão de letras maiúsculas e minúsculas
        if(projectService.existsByName(projectDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Project is already registered!");
        }

        ProjectEntity projectEntity = new ProjectEntity();
        BeanUtils.copyProperties(projectDTO, projectEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.save(projectEntity));
    }


    /*@GetMapping
    public ResponseEntity<Page<ProjectEntity>> getAllProjects(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(projectService.findAll(pageable));
    }*/

    @GetMapping
    public List<ProjectEntity> getProjects() {
        return projectService.findAll();
    }

    @GetMapping("/{id}")
    public ProjectEntity getProjectById(@PathVariable(value = "id") UUID id) {
        if(projectService.findById(id).isPresent())
            return projectService.findById(id).get();
        else return null;
    }

    /*@GetMapping("/{id}")
    public ResponseEntity<Object> getProjectById(@PathVariable(value = "id") UUID id) {
        Optional<ProjectEntity> projectModelOptional = projectService.findById(id);
        if(!projectModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(projectModelOptional.get());
    }*/

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateProject(@PathVariable(value = "id") UUID id, @RequestBody @Valid ProjectDTO projectDTO) {
        Optional<ProjectEntity> projectModelOptional = projectService.findById(id);
        if(!projectModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }
        ProjectEntity projectEntity = projectModelOptional.get();
        //Opção 1: abaixo setar os campos que podem ser modificados!
        //roleModel.setRoleTitle(roleDTO.getRoleTitle());

        //Opção 2: inserir apenas o id que o restante dos campos são atualizados:
        BeanUtils.copyProperties(projectDTO, projectEntity);
        projectEntity.setId(projectModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(projectService.save(projectEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProject(@PathVariable(value = "id") UUID id) {
        Optional<ProjectEntity> projectModelOptional = projectService.findById(id);
        if(!projectModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }
        projectService.delete(projectModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Project deleted successfully!");
    }
}
