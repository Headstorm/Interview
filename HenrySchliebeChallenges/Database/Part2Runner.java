
import java.util.*;
import java.io.*;
import java.util.*;

public class Part2Runner {

	public static void main(String[] args) {
		try{
			System.out.println("Reading file...");
			File file = new File("data.json");
			Scanner scanner = new Scanner(file);
			String line;
			ArrayList<String> lines = new ArrayList<String>();
			int orders = 0;
			while(scanner.hasNextLine()){
				line = scanner.nextLine();
				if(line.contains("recordid")) orders++;
				lines.add(line.replaceAll("\"",""));
			}
			System.out.println("Parsing file...");
			System.out.println(orders+" orders to parse");
			String all = "";
			for(String l : lines){
				all+=l;
			}
			int c = 0;
			ArrayList<String> queries = new ArrayList<String>();
			System.out.println("Converting to MySQL inserts...");
			while(c<orders){
				String query = "insert into startup_order values(";
				all=all.substring(all.indexOf("recordid"));
				String rid = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=rid+", '";
				all=all.substring(all.indexOf("name"));
				String n = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=n+"', '";
				all=all.substring(all.indexOf("cellphone"));
				String ce = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=ce+"', '";
				all=all.substring(all.indexOf("workphone"));
				String work = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=work+"', '";
				all=all.substring(all.indexOf("email"));
				String em = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=em+"', '";
				all=all.substring(all.indexOf("address"));
				String add = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=add+"', ";
				all=all.substring(all.indexOf("basic"));
				String bas = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=bas+", ";
				all=all.substring(all.indexOf("adv"));
				String adv = all.substring(all.indexOf(":")+1, all.indexOf(","));
				query+=adv+", ";
				all=all.substring(all.indexOf("protection"));
				String prot = all.substring(all.indexOf(":")+1, all.indexOf(":")+5);
				if(prot.equals("true")){
					query+="true";
				}else{
					query+="false";
				}
				//end of this query
				query+=");";
				c++;
				queries.add(query);
			}
			System.out.println("Printing MySQL insert statements...");
			for(String q : queries){
				System.out.println(q);
			}
		}catch(Exception e){
			System.out.println("Error");
		}
	}

}


