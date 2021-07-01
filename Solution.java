package com.interview;

import java.util.*;

public class Solution {
    public List<Pair<Integer, Character>> solve(List<Character> input) {
        List<Pair<Integer, Character>> outputs = new ArrayList<>();
        for (Map.Entry<Character, Integer> pair : counter(input).entrySet()) {
            outputs.add(new Pair<>(pair.getValue(), pair.getKey()));
        }
        return outputs;
    }

    private Map<Character, Integer> counter(List<Character> input) {
        final Map<Character, Integer> counts = new LinkedHashMap<>();
        for (Character word : input) {
            counts.merge(word, 1, Integer::sum);
        }
        return counts;
    }
}
