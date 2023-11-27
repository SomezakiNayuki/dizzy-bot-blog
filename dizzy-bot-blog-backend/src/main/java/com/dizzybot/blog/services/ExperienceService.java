package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Experience;
import com.dizzybot.blog.entities.User;

import java.util.List;

public interface ExperienceService {

    public Experience findById(String id);

    public List<Experience> findByUser(User user);

    public Experience saveExperience(Experience experience);

}
