package com.headstorm.interview.backend;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import io.javalin.Javalin;
import io.javalin.http.BadRequestResponse;
import io.javalin.plugin.json.JavalinJson;

public class App 
{
	public static void main(String[] args)
	{
		int port = 80;
		
		if (args.length > 0)
		{
			try
			{
				port = Integer.valueOf(args[0]);
			}
			catch (NumberFormatException ex)
			{
				ex.printStackTrace();
			}
		}
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		
		JavalinJson.setFromJsonMapper(gson::fromJson);
		JavalinJson.setToJsonMapper(gson::toJson);
		
		Javalin.create(config ->
		{
			config.defaultContentType = "application/json";
			config.enableCorsForAllOrigins();
		})
		.get("test", ctx ->
		{
			int[] data = new int[500];
			
			for (int i = 0; i < 500; i++)
			{
				int random = (int)(Math.random() * 10000);
				data[i] = random;
			}
			
			ctx.json(data);
		})
		.get("data", ctx ->
		{
			ctx.json(DataManager.getData());
		})
		.post("data", ctx ->
		{
			int[] data = ctx.bodyAsClass(int[].class);
			
			if (data.length != 500)
			{
				throw new BadRequestResponse("Data size must be exactly 500 integers");
			}
			
			DataManager.setData(data);
		})
		.patch("data", ctx ->
		{
			int random = (int)(Math.random() * 10000);
			DataManager.insertData(random);
			
			ctx.status(200);
			ctx.json(random);
		})
		.start(port)
		;
	}
}