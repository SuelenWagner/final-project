package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.RoleEntity;
import com.api.finalprojectbackend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoleService {

    //service precisa acionar o repository
    @Autowired
    final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Transactional
    public RoleEntity save(RoleEntity roleEntity) {
        return roleRepository.save(roleEntity);
    }

    //método declarado no repository
    public boolean existsByName(String name) {
        return roleRepository.existsByName(name);
    }

    public Page<RoleEntity> findAll(Pageable pageable) {
        return roleRepository.findAll(pageable);
    }

    public Optional<RoleEntity> findById(UUID id) {
        return roleRepository.findById(id);
    }

    @Transactional
    public void delete(RoleEntity roleEntity) {
        roleRepository.delete(roleEntity);
    }
}
