package com.example.backendchallenge.repositories;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Integer Array Repository - service for storing the list of integers in memory
 */
@Service
public class IntArrayRepositoryImpl implements IntArrayRepository {

    private ArrayList<Integer> intArray = new ArrayList<>();

    /**
     * sets the integer array
     * @param intArray
     */
    public void setIntArray(ArrayList<Integer> intArray) {

        // clear existing array and reload it
        this.intArray.clear();
        this.intArray.addAll(intArray);
    }

    /**
     * returns sorted integer array
     * @return - sorted integer array
     */
    public List<Integer> getIntArraySorted() {

        // create a local copy of the integer array, sort it and return
        List<Integer> sortedArray = new ArrayList<Integer>();
        sortedArray.addAll(intArray);
        Collections.sort(sortedArray);
        return sortedArray;
    }
}
