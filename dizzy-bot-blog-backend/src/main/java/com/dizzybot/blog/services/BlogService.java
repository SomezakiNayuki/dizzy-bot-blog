package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Blog;

import java.util.List;

public interface BlogService {

    public List<Blog> findAll();

    public Blog saveBlog(Blog blog);

    public void deleteById(Integer id);

}
