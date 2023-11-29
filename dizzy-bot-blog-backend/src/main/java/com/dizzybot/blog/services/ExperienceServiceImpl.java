package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Experience;
import com.dizzybot.blog.repositories.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class ExperienceServiceImpl implements ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    public List<Experience> findByUserId(Integer userId) {
        List<Experience> sanitizedExperiences = experienceRepository.findByUserId(userId);
        for (Experience experience : sanitizedExperiences) {
            experience.setUser(null);
        }
        return sanitizedExperiences;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Experience saveExperience(Experience experience) { return experienceRepository.save(experience); }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Integer id) { experienceRepository.deleteById(id); }

}
