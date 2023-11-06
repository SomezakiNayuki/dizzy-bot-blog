package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Blog;
import com.dizzybot.blog.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Transactional
    public Blog findById(String id) {
        return blogRepository.findById(id);
    }

}
