package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.User;

public interface UserService {

    public User saveUser(User user);

    public User findByUsernameAndPassword(String username, String password);

    public User findByUsername(String username);

    public User findByEmail(String email);

    public void archiveBlog(String username, Integer id);

    public void removeArchivedBlog(String username, Integer id);

}
