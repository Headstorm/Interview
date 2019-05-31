//This file is for the backend challenge. It takes a json file and converts to MySQL output
import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONObject;
import org.json.simple.parser.*;
import java.io.FileNotFoundException;

public class Converter {
	public static void main(String [] args) {
	
		try {
				
			Object obj = new JSONParser().parse(new FileReader("dbFile.json")); 
	          
	        // typecasting obj to JSONObject 
	        JSONObject jObject = (JSONObject) obj; 

			long recordId1 = (long) jObject.get("recordId");
			int recordId = (int) recordId1;
			String name = (String) jObject.get("name");
			String cellPhone = (String) jObject.get("cellPhone");
			String workPhone = (String) jObject.get("WorkPhone");
			String email = (String) jObject.get("email");
			String address = (String) jObject.get("address");
			
			//compiler did not accept (int) casting or Integer.parseInt()
			long basicWidgetOrder1 = (long) jObject.get("basicWidgetOrder");
			int basicWidgetOrder = (int) basicWidgetOrder1;
			
			long advanceWidgetOrder1 = (long) jObject.get("advanceWidgetOrder");
			int advanceWidgetOrder = (int) advanceWidgetOrder1;
			
			boolean protectionPlan = (boolean) jObject.get("protectionPlan");
			int number_id =1; // user id numbers would be assigned
			
			System.out.println("INSERT INTO user(user_id, name, cellPhone, workPhone, email, address)"+
			"values("+number_id+", '"+name+"', '"+cellPhone+"', '"+workPhone+"', '"+email+"', '"+address+"');");
			
			System.out.println("INSERT INTO item(record_id, user_id, basic_widget_order, advance_widget_order, personal_plan)"+
					"values("+recordId+", "+number_id+", "+basicWidgetOrder+", "+advanceWidgetOrder+", "+protectionPlan+");");
			
		}
		
		catch(FileNotFoundException e) {
			e.printStackTrace();	
		}
		catch(IOException e) {
			e.printStackTrace();
		}
		catch(ParseException e) {
			e.printStackTrace();
		}
	}
}
