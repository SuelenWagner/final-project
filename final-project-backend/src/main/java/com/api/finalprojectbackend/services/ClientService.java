package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.ClientEntity;
import com.api.finalprojectbackend.repositories.ClientRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    //service precisa acionar o repository
    final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Transactional
    public ClientEntity save(ClientEntity clientEntity) {
        return clientRepository.save(clientEntity);
    }

    //método declarado no repository
    public boolean existsByName(String name) {
        return clientRepository.existsByName(name);
    }

    public Page<ClientEntity> findAll(Pageable pageable) {
        return clientRepository.findAll(pageable);
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
