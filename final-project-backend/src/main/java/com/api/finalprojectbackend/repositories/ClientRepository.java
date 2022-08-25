package com.api.finalprojectbackend.repositories;

import com.api.finalprojectbackend.entities.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<ClientEntity, UUID> {

    boolean existsByName(String name);
}
