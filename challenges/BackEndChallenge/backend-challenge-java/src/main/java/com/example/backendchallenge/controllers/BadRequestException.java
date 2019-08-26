package com.example.backendchallenge.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * custom exception for reporting bad requests
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason="Provide integer array with 500 elements")
public class BadRequestException extends RuntimeException {
}
