package head;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;



@Path("/data")
public class Numbers{
	
	int[] arr = new int[5001];
	int count = 0;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String check(String nums) throws ParseException {
		
		Pattern p = Pattern.compile("-?\\d+");
		count=0;
		String outString = "";
		Matcher m = p.matcher(nums);
		while (m.find()) {
		 int n = Integer.parseInt(m.group());
		 arr[count++] = n;
		 if (count>5000) {
			  break;
		 }
		}
		
		if(count>5000)
			outString = "Number set too large. ";
			
		return outString;

    }
	
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String checkHTML(){
		Arrays.sort(arr);
			JSONArray jsArray = new JSONArray();
	    
		for (int i = 0; i < arr.length; i++) {
	          jsArray.add(arr[i]);
	     }
	    
     int[] array = new int[count];
	     for (int i = 0; i < count; i++) {
	        array[i] = (int) jsArray.get(i);
	     }
	     
		return (Arrays.toString(array));
	}
	
	
	
	
	
	
}




