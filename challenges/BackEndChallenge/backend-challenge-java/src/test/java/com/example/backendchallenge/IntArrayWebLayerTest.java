package com.example.backendchallenge;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class IntArrayWebLayerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void postIntArrayTestSuccess() throws Exception {
        List<Integer> postIntArray = new ArrayList<>(createRandomIntArray(500));
        ObjectMapper mapper = new ObjectMapper();

        this.mockMvc.perform(post("/data")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(postIntArray)))
                .andExpect(status().isOk());

        MvcResult result = this.mockMvc.perform(get("/data")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String resultStr = result.getResponse().getContentAsString();
        ArrayList<Integer> intArray = mapper.readValue(resultStr, new ArrayList<Integer>().getClass());

        Collections.sort(postIntArray);
        assertThat(intArray.size(), is(postIntArray.size()));
        assertThat(intArray, is(postIntArray));
    }

    @Test
    public void postIntArrayTestTooSmall() throws Exception {
        List<Integer> postIntArray = new ArrayList<>(createRandomIntArray(499));
        ObjectMapper mapper = new ObjectMapper();

        this.mockMvc.perform(post("/data")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(postIntArray)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void postIntArrayTestTooLarge() throws Exception {
        List<Integer> postIntArray = new ArrayList<>(createRandomIntArray(501));
        ObjectMapper mapper = new ObjectMapper();

        this.mockMvc.perform(post("/data")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(postIntArray)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void postIntArrayTestBadInput() throws Exception {
        this.mockMvc.perform(post("/data")
                .contentType(MediaType.APPLICATION_JSON)
                .content("bad input"))
                .andExpect(status().isBadRequest());
    }


    /**
     * generate random integer array of specified size
     * @param size
     * @return
     */
    private List<Integer> createRandomIntArray(int size) {
        Random random = new Random();

        List<Integer> intArray = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            intArray.add(random.nextInt());
        }
        return intArray;
    }

}

