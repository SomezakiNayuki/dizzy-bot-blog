package com.dizzybot.blog.controllers;

import com.dizzybot.blog.entities.Experience;
import com.dizzybot.blog.entities.User;
import com.dizzybot.blog.responses.Response;
import com.dizzybot.blog.services.ExperienceService;
import com.dizzybot.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("/experience")
@RestController
public class ExperienceController {

    @Autowired
    ExperienceService experienceService;

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Response> create(Map<String, String> body) {
        Experience experience = new Experience(body.get("period"), body.get("title"), body.get("institution"),
                body.get("location"), body.get("description"), body.get("type"));
        experienceService.saveExperience(experience);
        return new ResponseEntity<>(new Response("Experience created"), HttpStatus.OK);
    }

    @PostMapping("getAll")
    public ResponseEntity<List<Experience>> getAllExperiences(@RequestBody Map<String, String> body) {
        User user = userService.findByUsername(body.get("username"));
        return new ResponseEntity<>(experienceService.findByUser(user), HttpStatus.OK);
    }

}
