package com.example.backendchallenge.controllers;

import com.example.backendchallenge.repositories.IntArrayRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("data")
public class IntArrayController {

    static final int DATA_SIZE = 500;

    IntArrayRepository intArrayRepository;

    public IntArrayController(IntArrayRepository intArrayRepository) {
        this.intArrayRepository = intArrayRepository;
    }

    @PostMapping(consumes = "application/json")
    public void postIntArray(@RequestBody ArrayList<Integer> intArray) {

        // validate that the input size match the required data size
        if (intArray.size() != DATA_SIZE) {
            throw new BadRequestException();
        }

        intArrayRepository.setIntArray(intArray);
    }

    @GetMapping(produces = "application/json")
    public List<Integer> getIntArray() {
        return intArrayRepository.getIntArraySorted();
    }

}
