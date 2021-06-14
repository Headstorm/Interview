import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;
import java.util.StringTokenizer;
import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class backChallenge {
	private static HttpURLConnection connection;
	private static StringBuffer data;
	
	public backChallenge(int[] numArray, JSONObject o) {
		BufferedReader reader;
		data = new StringBuffer();
		try {
			URL url = new URL("https://api.github.com/repos/Headstorm/Interview/contents/challenges/data?ref=master");
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("PUT");
			connection.setDoOutput(true);
			connection.setRequestProperty("Content-Type", "application/json");
			connection.setRequestProperty("Accept", "application/json");
			OutputStreamWriter os = new OutputStreamWriter(connection.getOutputStream());
			
	       // JSONObject jOb = new JSONObject();
			//jOb.put("accept", "application/vnd.github.v3+json");
		//	jOb.put("path", "challenges/data/newNumbers.json");
			//jOb.put("name", "JSON Data Numbers");
			//jOb.put("content", o);
			String content = ("{\"accept\":\"application/vnd.github.v3+json\", "
					+ " \"message\": \"JSON Data Numbers\", \"path\": \"challenges/data/newNumbers.json\","
					+ "\"content\": " + o);
			
			System.out.print(content);
			os.write(content);
			
			int status = connection.getResponseCode();
			if (status != 200 && status!= 201) {
				System.out.println("Error: " + status);
				System.exit(0);
			}
		}
		catch (Exception e){
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) throws IOException {
		System.out.println("Enter file name with JSON list of 500 numbers and press enter.");
		Scanner in = new Scanner(System.in);
		String fileName = in.next();
		JSONParser parser = new JSONParser();
		int[] numArray = new int[500];
		
		try {
			Object o = parser.parse(new FileReader(fileName));
			JSONObject jObj = (JSONObject) o;
			String numbers = jObj.get("data").toString();
			StringTokenizer tokens = new StringTokenizer(numbers, "[*,\s*]*");
			
			int count = 0;
			while (tokens.hasMoreTokens() || count > 500) {
				numArray[count] = (int) Integer.parseInt(tokens.nextToken());
				count++;
			}
			if (count != 500) {
				System.out.println("Error - JSON Object must contain exactly 500 numbers");
				System.exit(0);
			}
			new backChallenge(numArray, jObj);
		}
		catch (FileNotFoundException fe) {
			fe.printStackTrace();
			System.out.println("Error - file not found. Please make sure to type in file name with extension (ie 'filename.txt'");
			System.exit(0);
		}
		catch (ParseException pe) {
			pe.printStackTrace();
			System.out.println("Error - Please make sure file contains JSON with key 'data' and value as 500 numbers separated by commas");
			System.exit(0);
		}
		catch (ClassCastException cce) {
			cce.printStackTrace();
			System.out.println("Error - Please make sure all elements in list are numbers only");
			System.exit(0);
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Error - Please try again");
			System.exit(0);
		}
		

	}
}