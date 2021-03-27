package com.example.restservice;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

    @RestController
    public class DataController {
        private final AtomicLong counter = new AtomicLong();
        @GetMapping("/data")
        public Data data(@RequestParam(value = "nums", defaultValue = "") String nums)  {
            String delims = "[,]";      // Parse the args String into respective numbers
            String[] tokens = nums.split(delims);
            ArrayList numberList = new ArrayList();
            if(tokens.length < 500 || tokens.length > 500) {        // Error check for length
                return new Data(counter.incrementAndGet(), "Error");
            }
            for(String num : tokens) {
                try {
                    int number = Integer.valueOf(num);
                    numberList.add(number);
                } catch(Exception e){
                    return new Data(counter.incrementAndGet(), "Error");    // Error check for non int values
                }
            }
            Collections.sort(numberList);       // We made it this far so sort the list
            StringBuffer finalNums = new StringBuffer();

            for(Object nms : numberList){           // Rebuild the string to represent a list of numbers in the json
                finalNums.append(nms.toString() + ", ");
            }

        return new Data(counter.incrementAndGet(), finalNums.toString());   // build the data object with "list"
        }
    }
