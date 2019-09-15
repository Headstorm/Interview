package com.headstorm.interview.database;

import java.io.FileReader;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;

public class App 
{
	public static void main(String[] args)
	{
		if (args.length < 1)
		{
			System.out.println("You must provide a file path to read in!");
			return;
		}
		
		Gson gson = new Gson();
		
		try (JsonReader reader = new JsonReader(new FileReader(args[0])))
		{
			PortableData[] port = gson.fromJson(reader, PortableData[].class);
			
			for (PortableData data : port)
			{
				System.out.println(data.getInsertionStatement());
			}
		}
		catch (IOException ex)
		{
			ex.printStackTrace();
		}
	}
}