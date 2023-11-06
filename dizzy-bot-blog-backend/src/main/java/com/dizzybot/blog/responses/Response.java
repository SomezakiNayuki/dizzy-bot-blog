package com.dizzybot.blog.responses;

import lombok.Getter;

@Getter
public class Response {

    private String message;

    public Response(String message) {
        this.message = message;
    }

}
