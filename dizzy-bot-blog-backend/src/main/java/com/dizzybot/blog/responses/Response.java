package com.dizzybot.blog.responses;

import lombok.Getter;

@Getter
public class Response {

    private String message;

    private Object object;

    public Response(String message) {
        this.message = message;
    }

    public Response(Object object) {
        this.object = object;
    }

    public Response(String message, Object object) {
        this.message = message;
        this.object = object;
    }

}
