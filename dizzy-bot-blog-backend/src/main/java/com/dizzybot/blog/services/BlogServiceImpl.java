package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Blog;
import com.dizzybot.blog.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public Blog findById(String id) {
        return blogRepository.findById(id);
    }

    public List<Blog> findAll() { return blogRepository.findAll(); }

    @Transactional(propagation = Propagation.REQUIRED)
    public Blog saveBlog(Blog blog) { return blogRepository.save(blog); }

}
