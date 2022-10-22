package com.api.finalprojectbackend.controllers;

import com.api.finalprojectbackend.dtos.ProjectDTO;
import com.api.finalprojectbackend.entities.ProjectEntity;
import com.api.finalprojectbackend.services.ProjectService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Object> saveProject(@RequestBody @Valid ProjectDTO projectDTO) {
        if(projectService.existsByName(projectDTO.getName())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Project is already registered!");
        }

        ProjectEntity projectEntity = new ProjectEntity();
        BeanUtils.copyProperties(projectDTO, projectEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.save(projectEntity));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public List<ProjectEntity> getProjects() {
        return projectService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ProjectEntity getProjectById(@PathVariable(value = "id") UUID id) {
        if(projectService.findById(id).isPresent())
            return projectService.findById(id).get();
        else return null;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateProject(@PathVariable(value = "id") UUID id, @RequestBody @Valid ProjectDTO projectDTO) {
        Optional<ProjectEntity> projectModelOptional = projectService.findById(id);
        if(!projectModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found.");
        }
        ProjectEntity projectEntity = projectModelOptional.get();
        BeanUtils.copyProperties(projectDTO, projectEntity);
        projectEntity.setId(projectModelOptional.get().getId());

        return ResponseEntity.status(HttpStatus.OK).body(projectService.save(projectEntity));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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
