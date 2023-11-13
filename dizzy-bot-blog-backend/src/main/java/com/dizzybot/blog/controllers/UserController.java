package com.dizzybot.blog.controllers;

import com.dizzybot.blog.entities.User;
import com.dizzybot.blog.responses.Response;
import com.dizzybot.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody Map<String, String> body) {
        User user = userService.findByUsername(body.get("username"));
        if (user == null) {
            return new ResponseEntity<>(new Response("User not registered"), HttpStatus.NOT_FOUND);
        } else {
            user = userService.findByUsernameAndPassword(body.get("username"), body.get("password"));
            if (user == null) {
                return new ResponseEntity<>(new Response("User login error"), HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                return new ResponseEntity<>(new Response("User logged in"), HttpStatus.OK);
            }
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody Map<String, String> body) {
        User user = new User(body.get("username"), body.get("password"), body.get("email"));
        userService.saveUser(user);
        return new ResponseEntity<>(new Response("User registered"), HttpStatus.OK);
    }

    @PostMapping("/getInfo")
    public ResponseEntity<User> getInfo(@RequestBody Map<String, String> body) {
        User user = userService.findByUsername(body.get("username"));
        User sanitisedUser = new User();
        sanitisedUser.setId(user.getId());
        sanitisedUser.setUsername(user.getUsername());
        sanitisedUser.setEmail(user.getEmail());
        sanitisedUser.setBlogs(user.getBlogs());
        sanitisedUser.setExperiences(user.getExperiences());
        return new ResponseEntity<>(sanitisedUser, HttpStatus.OK);
    }

}
