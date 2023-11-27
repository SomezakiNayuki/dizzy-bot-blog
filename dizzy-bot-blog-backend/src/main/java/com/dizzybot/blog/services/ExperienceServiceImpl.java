package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Experience;
import com.dizzybot.blog.entities.User;
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

    public Experience findById(String id) {
        return experienceRepository.findById(id);
    }

    public List<Experience> findByUser(User user) {
        return experienceRepository.findByUser(user);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Experience saveExperience(Experience experience) { return experienceRepository.save(experience); }

}
