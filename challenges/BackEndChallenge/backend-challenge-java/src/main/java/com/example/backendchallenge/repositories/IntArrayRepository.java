package com.example.backendchallenge.repositories;

import java.util.ArrayList;
import java.util.List;

/**
 * interface contract for integer array repository
 */
public interface IntArrayRepository {

    /**
     * set integer array
     * @param intArray
     */
    void setIntArray(ArrayList<Integer> intArray);

    /**
     * returns sorted integer array
     * @return
     */
    List<Integer> getIntArraySorted();
}
