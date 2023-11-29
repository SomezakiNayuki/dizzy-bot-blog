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

    public List<Blog> findAll() {
        List<Blog> blogs = blogRepository.findAll();
        for (Blog blog : blogs) {
            blog.setUsername(blog.getAuthor().getUsername());
        }

        return blogs;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Blog saveBlog(Blog blog) { return blogRepository.save(blog); }

}
