package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.PositionEntity;
import com.api.finalprojectbackend.repositories.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class PositionService {

    @Autowired
    final PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @Transactional
    public PositionEntity save(PositionEntity positionEntity) {
        return positionRepository.save(positionEntity);
    }

    public boolean existsByName(String name) {
        return positionRepository.existsByName(name);
    }

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
