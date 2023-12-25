package com.dizzybot.blog.controllers;

import com.dizzybot.blog.entities.Blog;
import com.dizzybot.blog.entities.User;
import com.dizzybot.blog.responses.Response;
import com.dizzybot.blog.services.BlogService;
import com.dizzybot.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RequestMapping("/blog")
@RestController
public class BlogController {

    @Autowired
    BlogService blogService;

    @Autowired
    UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return new ResponseEntity<>(blogService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Response> create(@RequestBody Map<String, String> body) {
        User user = userService.findByUsername(body.get("username"));
        int likes = Integer.parseInt(body.get("likes"));
        String date = body.get("date");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String image = body.get("image");
        Blog blog = new Blog(
                body.get("title"),
                body.get("subtitle"),
                user,
                body.get("content"),
                likes,
                LocalDateTime.parse(date, formatter),
                image
        );
        blogService.saveBlog(blog);
        return new ResponseEntity<>(new Response("Blog created"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteBlog(@PathVariable Integer id) {
        blogService.deleteById(id);
        return new ResponseEntity<>(new Response("Blog " + id + " deleted"), HttpStatus.OK);
    }

}
