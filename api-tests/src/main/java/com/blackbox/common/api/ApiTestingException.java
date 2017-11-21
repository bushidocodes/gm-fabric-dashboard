package com.blackbox.common.api;


public class ApiTestingException extends RuntimeException {
    public ApiTestingException() {
        super();
    }

    public ApiTestingException(String message, Throwable cause) {
        super(message, cause);
    }

    public ApiTestingException(String message) {
        super(message);
    }

    public ApiTestingException(Throwable cause) {
        super(cause);
    }
}
