package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Blog;
import com.dizzybot.blog.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public Blog findById(Integer id) {
        Optional<Blog> blog = blogRepository.findById(id);
        return blog.isPresent() ? blog.get() : null;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Blog saveBlog(Blog blog) { return blogRepository.save(blog); }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(Integer id) { blogRepository.deleteById(id); }

    public void likeBlog(Integer id) {
        Blog blog = this.findById(id);
        if (blog != null) {
            blog.like();
            blogRepository.save(blog);
        }
    }

    public void unlikeBlog(Integer id) {
        Blog blog = this.findById(id);
        if (blog != null) {
            blog.unlike();
            blogRepository.save(blog);
        }
    }

}
