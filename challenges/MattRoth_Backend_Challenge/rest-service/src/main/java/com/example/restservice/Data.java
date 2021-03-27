package com.example.restservice;

public class Data {

    private final long id;
    private final String content;

    public Data(long id, String str){
        this.id = id;
        content = str;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
