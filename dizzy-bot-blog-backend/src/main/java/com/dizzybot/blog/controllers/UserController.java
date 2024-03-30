package com.dizzybot.blog.controllers;

import com.dizzybot.blog.entities.User;
import com.dizzybot.blog.errors.LoginException;
import com.dizzybot.blog.errors.RegisterException;
import com.dizzybot.blog.responses.Response;
import com.dizzybot.blog.services.AuthenticationService;
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
    AuthenticationService authenticationService;

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody Map<String, String> body) {
        try {
            authenticationService.login(body.get("username"), body.get("password"));
        } catch (LoginException e) {
            return new ResponseEntity<>(new Response(e.getMessage()), e.getHttpStatus());
        }

        return new ResponseEntity<>(new Response("User logged in"), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody Map<String, String> body) {
        try {
            authenticationService.register(body.get("username"), body.get("password"), body.get("email"));
        } catch (RegisterException e) {
            return new ResponseEntity<>(new Response(e.getMessage()), e.getHttpStatus());
        }
        return new ResponseEntity<>(new Response("User registered"), HttpStatus.OK);

    }

    @GetMapping("/getInfo")
    public ResponseEntity<User> getInfo(@RequestHeader String username) {
        User user = userService.findByUsername(username);

        User sanitisedUser = new User();

        sanitisedUser.setId(user.getId());
        sanitisedUser.setUsername(user.getUsername());
        sanitisedUser.setEmail(user.getEmail());
        sanitisedUser.setBlogs(user.getBlogs());
        sanitisedUser.setExperiences(user.getExperiences());
        sanitisedUser.setLinkedInURL(user.getLinkedInURL());
        sanitisedUser.setPhone(user.getPhone());
        sanitisedUser.setUniversity(user.getUniversity());
        sanitisedUser.setArchivedBlogIds(user.getArchivedBlogIds());

        return new ResponseEntity<>(sanitisedUser, HttpStatus.OK);
    }

}
