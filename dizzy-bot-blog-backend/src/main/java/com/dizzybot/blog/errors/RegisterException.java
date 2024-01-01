package com.dizzybot.blog.errors;

import org.springframework.http.HttpStatus;

public class RegisterException extends Exception {

    private HttpStatus httpStatus;

    public RegisterException() {
        super();
    }

    public RegisterException(String message) {
        super(message);
    }

    public RegisterException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
