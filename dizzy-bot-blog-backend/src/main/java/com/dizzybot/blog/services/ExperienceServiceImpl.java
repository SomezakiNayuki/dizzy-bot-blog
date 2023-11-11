package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Experience;
import com.dizzybot.blog.repositories.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class ExperienceServiceImpl implements ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    public Experience findById(String id) {
        return experienceRepository.findById(id);
    }

}
