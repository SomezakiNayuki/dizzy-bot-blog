package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.Blog;
import com.dizzybot.blog.entities.User;
import com.dizzybot.blog.repositories.BlogRepository;
import com.dizzybot.blog.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogService blogService;

    @Transactional(propagation = Propagation.REQUIRED)
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void archiveBlog(String username, Integer id) {
        User user = userRepository.findByUsername(username);
        Blog blog = blogService.findById(id);
        user.archiveBlog(blog.getId());
        userRepository.save(user);
    }

    public void removeArchivedBlog(String username, Integer id) {
        User user = userRepository.findByUsername(username);
        Blog blog = blogService.findById(id);
        user.removeArchivedBlog(blog.getId());
        userRepository.save(user);
    }

}
