package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Blog;

import java.util.List;

public interface BlogService {

    public Blog findById(String id);

    public List<Blog> findAll();

    public Blog saveBlog(Blog blog);

}
