package com.api.finalprojectbackend.services;

import com.api.finalprojectbackend.entities.TechEntity;
import com.api.finalprojectbackend.repositories.TechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class TechService {

    @Autowired
    private TechRepository techRepository;

    public TechService(TechRepository techRepository) {
        this.techRepository = techRepository;
    }

    @Transactional
    public TechEntity save(TechEntity techEntity) {
        return techRepository.save(techEntity);
    }

    public boolean existsByName(String name) {
        return techRepository.existsByName(name);
    }

    public List<TechEntity> findAll() {
        return techRepository.findAll();
    }

    public Optional<TechEntity> findById(UUID id) {
        return techRepository.findById(id);
    }

    @Transactional
    public void delete(TechEntity techEntity) {
        techRepository.delete(techEntity);
    }
}
