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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
        User user = userService.findByUsername((String) body.get("username"));

        String date = body.get("date");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        Blog blog = new Blog(
                body.get("title"),
                body.get("subtitle"),
                user,
                body.get("content"),
                Integer.parseInt(body.get("likes")),
                LocalDateTime.parse(date, formatter)
        );

        Blog blogSaved = blogService.saveBlog(blog);
        return new ResponseEntity<>(new Response("Blog created", blogSaved), HttpStatus.OK);
    }

    @PostMapping("/uploadImage/{id}")
    public ResponseEntity<Response> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable Integer id) {
        Blog blog = blogService.findById(id);
        try {
            blog.setImage(file.getBytes());
            blogService.saveBlog(blog);
            return new ResponseEntity<>(new Response("Image uploaded"), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(new Response("Image upload failed", e), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteBlog(@PathVariable Integer id) {
        blogService.deleteById(id);
        return new ResponseEntity<>(new Response("Blog " + id + " deleted"), HttpStatus.OK);
    }

    @GetMapping("/archive/{id}")
    public ResponseEntity<Response> archiveBlog(@PathVariable Integer id, @RequestHeader("username") String username) {
        blogService.likeBlog(id);
        userService.archiveBlog(username, id);
        return new ResponseEntity<>(new Response("Blog archived"), HttpStatus.OK);
    }

    @DeleteMapping("/archive/remove/{id}")
    public ResponseEntity<Response> removeArchiveBlog(@PathVariable Integer id, @RequestHeader("username") String username) {
        blogService.unlikeBlog(id);
        userService.removeArchivedBlog(username, id);
        return new ResponseEntity<>(new Response("Blog archive removed"), HttpStatus.OK);
    }

    @GetMapping("/getArchivedBlogs")
    public ResponseEntity<List<Blog>> getArchivedBlog(@RequestHeader("username") String username) {
        List<Blog> blogs = new ArrayList<>();
        User user = userService.findByUsername(username);
        for (Integer id: user.getArchivedBlogIds()) {
            Blog blog = blogService.findById(id);
            blog.setUsername(blog.getAuthor().getUsername());
            blogs.add(blog);
        }
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

}
