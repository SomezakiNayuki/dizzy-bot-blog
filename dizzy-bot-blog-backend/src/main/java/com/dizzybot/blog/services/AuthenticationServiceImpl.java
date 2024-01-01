package com.dizzybot.blog.services;

import com.dizzybot.blog.entities.User;
import com.dizzybot.blog.errors.LoginException;
import com.dizzybot.blog.errors.RegisterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    UserService userService;

    public final String NOT_FOUND = "User not registered";
    public final String EXIST = "User exists";
    public final String LOGIN_ERROR = "User login error";

    public void login(String username, String password) throws LoginException {
        User user = userService.findByUsername(username);
        if (user == null) {
            throw new LoginException(this.NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
            user = userService.findByUsernameAndPassword(username, password);
            if (user == null) {
                throw new LoginException(this.LOGIN_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void register(String username, String password, String email) throws RegisterException {
        if (userService.findByUsername(username) != null || userService.findByEmail(email) != null) {
            throw new RegisterException(this.EXIST, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            User user = new User(username, password, email);
            userService.saveUser(user);
        }
    }

}
