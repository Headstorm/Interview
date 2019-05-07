package restApi;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.json.JSONArray;
import org.json.JSONObject;

import com.sun.jersey.multipart.FormDataParam;

@Path("/rest")
public class RestApiCall {

	private static List<Integer> numberListInt;
	private static final int expectedListSize = 500;

	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Path("/data")
	public String validateNumbersPost(@FormDataParam("file") InputStream fileInputStream) {
		
		JSONObject numberListJsonObj = null;
		JSONArray jsonIntArray = null;
		String jsonString = null;
		String actualJsonString = null;
		List<Integer> numberList = new ArrayList<>();
		
		try {
			ByteArrayOutputStream result = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024];
			int length;
			while ((length = fileInputStream.read(buffer)) != -1) {
				result.write(buffer, 0, length);
			}
			jsonString = result.toString(StandardCharsets.UTF_8.name());
			actualJsonString = jsonString.substring(jsonString.indexOf("{"), jsonString.indexOf("}")+1);
			numberListJsonObj = new JSONObject(actualJsonString);
			jsonIntArray = numberListJsonObj.getJSONArray("numberList");
			
			if (jsonIntArray != null) { 
				   for (int i=0;i<jsonIntArray.length();i++){ 
					   numberList.add(jsonIntArray.getInt(i));
				   } 
				} 
			
		} catch (Exception e) {
			return new String("JSON file contains errors: " + e.getMessage() + "JSON string: "+ actualJsonString);
		}

		if (numberList.size() != expectedListSize) {
			numberListInt = null;
			return new String("Size is less than "+expectedListSize);
		}
		numberListInt = numberList;
		return new String("List accepted successfully");
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/data")
	public String sortNumbers() {

		if (numberListInt == null)
			return "List of numbers is empty";

		Collections.sort(numberListInt);

		List<String> numberList = new ArrayList<>();
		for (int number : numberListInt) {
			numberList.add(Integer.toString(number));
		}
		String listToBeReturned = String.join(", ", numberList);

		return listToBeReturned;
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/helloworld")
	public String sayPlainTextHello() {
		return "Hello World!";
	}
}
