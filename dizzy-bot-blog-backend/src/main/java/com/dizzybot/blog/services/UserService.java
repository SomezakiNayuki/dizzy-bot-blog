package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.User;

public interface UserService {

    public User saveUser(User user);

    public User findByUsernameAndPassword(String username, String password);

    public User findByUsername(String username);

}
