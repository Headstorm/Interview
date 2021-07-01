package com.challenge.randomrest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/data", produces = "application/json")
public class RandomNumberController {
    private List<Integer> userData;

    @GetMapping
    public ResponseEntity<String> processUserData() {
        if (userData == null) {
            return handleBadRequest("No list created", HttpStatus.BAD_REQUEST);
        }
        Collections.sort(userData);
        ObjectMapper mapper = new ObjectMapper();
        String jsonArray = "";
        try {
            jsonArray = mapper.writeValueAsString(userData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(jsonArray, new HttpHeaders(), HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<String> postUserData(@RequestBody List<Integer> randomNumList) {
        if (randomNumList.size() != 500) {
            return handleBadRequest("Invalid List", HttpStatus.BAD_REQUEST);
        }
        userData = randomNumList;
        return handleBadRequest("List created successfully", HttpStatus.CREATED);
    }


    private ResponseEntity<String> handleBadRequest(String status, HttpStatus statusCode) {
        ObjectMapper mapper = new ObjectMapper();
        HttpHeaders responseHeaders = new HttpHeaders();
        Map<String, String> body = new HashMap<>();
        body.put("message", status);
        String jsonBody = "";
        try {
            jsonBody = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(body);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(jsonBody, responseHeaders, statusCode);
    }
}
