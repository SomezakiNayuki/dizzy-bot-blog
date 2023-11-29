package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Experience;

import java.util.List;

public interface ExperienceService {

    public List<Experience> findByUserId(Integer userId);

    public Experience saveExperience(Experience experience);

    public void deleteById(Integer id);

}
