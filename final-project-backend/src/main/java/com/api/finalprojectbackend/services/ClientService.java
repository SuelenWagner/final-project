package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.ClientEntity;
import com.api.finalprojectbackend.repositories.ClientRepository;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class ClientService {

    final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Transactional
    public ClientEntity save(ClientEntity clientEntity) {
        return clientRepository.save(clientEntity);
    }

    public boolean existsByName(String name) {
        return clientRepository.existsByName(name);
    }

    @Transactional
    public List<ClientEntity> findAll() {
        return clientRepository.findAll();
    }

    @Transactional
    public Optional<ClientEntity> findById(UUID id) {
        return clientRepository.findById(id);
    }

    @Transactional
    public void delete(ClientEntity clientEntity) {
        clientRepository.delete(clientEntity);
    }
}
