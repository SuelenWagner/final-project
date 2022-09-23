package com.api.finalprojectbackend.services;

import ch.qos.logback.core.net.server.Client;
import com.api.finalprojectbackend.entities.ClientEntity;
import com.api.finalprojectbackend.repositories.ClientRepository;
import com.api.finalprojectbackend.repositories.ProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    //service precisa acionar o repository
    final ClientRepository clientRepository;

    final ProjectRepository projectRepository;

    public ClientService(ClientRepository clientRepository, ProjectRepository projectRepository) {
        this.clientRepository = clientRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ResponseEntity<Object> save(ClientEntity clientEntity) {

        ClientEntity newClient = new ClientEntity();
        newClient.setName(clientEntity.getName());
        newClient.setDescription(clientEntity.getDescription());
        newClient.setProjects(clientEntity.getProjects());
        ClientEntity savedClient = clientRepository.save(newClient);
        if(clientRepository.findById(savedClient.getId()).isPresent()) {
            return ResponseEntity.accepted().body("Successfully created Client and Projects!");
        } else
            return ResponseEntity.unprocessableEntity().body("Failed to create client");
        //return clientRepository.save(clientEntity);
    }

    /*@Transactional
    public ClientEntity save(ClientEntity clientEntity) {
        return clientRepository.save(clientEntity);
    }*/

    //método declarado no repository
    public boolean existsByName(String name) {
        return clientRepository.existsByName(name);
    }


    public Page<ClientEntity> findAll(Pageable pageable) {
        return clientRepository.findAll(pageable).map(clientEntity -> {
            Optional.ofNullable(clientEntity.getProjects()).orElseGet(Collections::emptyList);
            clientEntity.setProjects(new ArrayList<>());
            return clientEntity;
        });
    }


    @Transactional
    public Optional<ClientEntity> findById(UUID id) {
        return clientRepository.findById(id).map(clientEntity -> {
            Optional.ofNullable(clientEntity.getProjects()).orElseGet(Collections::emptyList);
            clientEntity.setProjects(new ArrayList<>());
            return clientEntity;
        });
    }

    @Transactional
    public void delete(ClientEntity clientEntity) {
        clientRepository.delete(clientEntity);
    }
}
