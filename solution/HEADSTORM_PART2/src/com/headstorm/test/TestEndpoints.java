package com.headstorm.test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.*;

import com.google.gson.Gson;

//My REST_API end points.
@Path("/rest")
public class TestEndpoints {
	
	private Gson gson = new Gson();
	public static List<Integer> numbers = new ArrayList<Integer>();
	
	//For GET endpoint
	@GET
	@Path("/data")
	@Produces("application/json")
	public String getData() {
		Numbers response=new Numbers();
		response.nums=numbers;
		//Directly converting our List of Integers stored in my Numbers class to JSON format output.
		return gson.toJson(response, Numbers.class);
	}
	
	//For POST endpoint
	@POST
	@Path("/data")
	@Produces("application/json")
	public String postData(String data) {
		try
		{
			//Directly converting the JOSN format data and storing it Numbers class.
			Numbers record = gson.fromJson(data, Numbers.class);
			//For checking the numbers in the input are exactly 500 or not.
			if(record.nums.size()==500)
			{
				numbers=record.nums;
				Collections.sort(numbers);
				return "{\"status\":\"sucess\"}";
			}
			else
			{
				return "{\"status\":\"failed - numbers need to be exactly 500\"}";
			}
		}
		//For inputs that are not integers.
		catch(Exception e)
		{
			return "{\"status\":\"failed - input is not integers\"}";
		}
	}
}
