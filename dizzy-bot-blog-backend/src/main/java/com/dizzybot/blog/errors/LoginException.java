package com.dizzybot.blog.errors;

import org.springframework.http.HttpStatus;

public class LoginException extends Exception {

    private HttpStatus httpStatus;

    public LoginException() {
        super();
    }

    public LoginException(String message) {
        super(message);
    }

    public LoginException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
