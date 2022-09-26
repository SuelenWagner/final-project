package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.PositionEntity;
import com.api.finalprojectbackend.repositories.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PositionService {

    //service precisa acionar o repository
    @Autowired
    final PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @Transactional
    public PositionEntity save(PositionEntity positionEntity) {
        return positionRepository.save(positionEntity);
    }

    //método declarado no repository
    public boolean existsByName(String name) {
        return positionRepository.existsByName(name);
    }

    /*public Page<PositionEntity> findAll(Pageable pageable) {
        return positionRepository.findAll(pageable);
    }*/

    public List<PositionEntity> findAll() {
        return positionRepository.findAll();
    }

    public Optional<PositionEntity> findById(UUID id) {
        return positionRepository.findById(id);
    }

    @Transactional
    public void delete(PositionEntity positionEntity) {
        positionRepository.delete(positionEntity);
    }
}
