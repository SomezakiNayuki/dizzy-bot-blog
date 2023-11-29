package com.dizzybot.blog.controllers;

import com.dizzybot.blog.entities.Experience;
import com.dizzybot.blog.entities.User;
import com.dizzybot.blog.responses.Response;
import com.dizzybot.blog.services.ExperienceService;
import com.dizzybot.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Response> create(@RequestBody Map<String, String> body) {
        User user = userService.findByUsername(body.get("username"));
        Experience experience = new Experience(body.get("period"), body.get("title"), body.get("institution"),
                body.get("location"), body.get("description"), body.get("type"), user);
        experienceService.saveExperience(experience);
        return new ResponseEntity<>(new Response("Experience created"), HttpStatus.OK);
    }

    @PostMapping("/getAll")
    public ResponseEntity<List<Experience>> getAllExperiences(@RequestBody Map<String, String> body) {
        return new ResponseEntity<>(
                experienceService.findByUserId(userService.findByUsername(body.get("username")).getId()), HttpStatus.OK
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteExperience(@PathVariable Integer id) {
        experienceService.deleteById(id);
        return new ResponseEntity<>(new Response("Experience " + id + " deleted"), HttpStatus.OK);
    }

}
