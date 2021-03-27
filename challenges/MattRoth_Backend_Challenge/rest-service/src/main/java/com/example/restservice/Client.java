package com.example.restservice;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;
import java.util.Random;

import java.io.IOException;
/**
 * simulate the input of JSON formatted as list of numbers.
 *
 */
public class Client {
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws IOException, ParseException {
        StringBuffer nums = new StringBuffer();
        Random rand = new Random();
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(new FileReader("C:\\Users\\Matt\\Downloads\\rest-service\\rest-service\\src\\main\\java\\com\\example\\restservice\\testJson"));
        // A JSON object. Key value pairs are unordered. JSONObject supports java.util.Map interface.
        JSONObject jsonObject = (JSONObject) obj;
        // A JSON array. JSONObject supports java.util.List interface.
        JSONArray list = (JSONArray) jsonObject.get("List");
        // An iterator over a collection. Iterator takes the place of Enumeration in the Java Collections Framework.
        // Iterators differ from enumerations in two ways:
        // 1. Iterators allow the caller to remove elements from the underlying collection during the iteration with well-defined semantics.
        // 2. Method names have been improved.
        Iterator<JSONObject> iterator = list.iterator();
        while (iterator.hasNext()) {
            nums.append(iterator.next() + ",");
        }
        String numbers = nums.toString();
        String delims = "[numbers: ]";      // Parse the args String into respective numbers
        String[] tokens = numbers.split(delims);

        URL url = new URL("http://localhost:8080/data?nums=" + tokens[9] );
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        int status = con.getResponseCode();
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        in.close();

        System.out.println(content);    // If we made it this far, display the JSON with "list" of random numbers sorted
    }

}


