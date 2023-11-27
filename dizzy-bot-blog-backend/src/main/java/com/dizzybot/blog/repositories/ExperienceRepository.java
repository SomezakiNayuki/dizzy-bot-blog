package com.dizzybot.blog.repositories;

import com.dizzybot.blog.entities.Experience;
import com.dizzybot.blog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Integer> {

    Experience findById(String id);

    List<Experience> findByUser(User user);

}
