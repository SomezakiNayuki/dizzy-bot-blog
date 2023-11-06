package com.dizzybot.blog.repositories;

import com.dizzybot.blog.entities.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Integer> {

    Experience findById(String id);

}
