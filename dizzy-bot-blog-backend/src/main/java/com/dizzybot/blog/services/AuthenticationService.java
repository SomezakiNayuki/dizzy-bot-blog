package com.dizzybot.blog.services;

import com.dizzybot.blog.errors.LoginException;
import com.dizzybot.blog.errors.RegisterException;

public interface AuthenticationService {

    public void login(String username, String password) throws LoginException;

    public void register(String username, String password, String email) throws RegisterException;

}
