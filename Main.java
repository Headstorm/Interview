package com.interview;

import java.util.List;

public class Main {

    public static void main(String[] args) {
        Solution solution = new Solution();
        List<Character> inputs = List.of('t', 't', 't', 't', 'b', 'c', 'c', 'a', 'a', 'd', 'r', 'r', 'r', 'r');
        List<Pair<Integer, Character>>outputs = solution.solve(inputs);
        for (Pair<Integer, Character> pair : outputs) {
            System.out.println(pair);
        }
    }
}
