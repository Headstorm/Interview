package Javier.DatabaseMigrationTool;
import java.io.*;
import java.util.ArrayList;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import Javier.DatabaseMigrationTool.NoSQLInfoObject;

public class DatabaseMigration {

	//* Objective:	get data from JSON file and print MySQL statements that successfully
	//				migrate NoSQL JSON dump into a relational database such as MySQL.
    //* Parameters: File file - represents the JSON file where NoSQL data was dumped
    //* Returns: 	None
    private void parseJsonFile(File file) throws FileNotFoundException, IOException, ParseException {
        JSONParser json_parser = new JSONParser();
        Object object = json_parser.parse(new FileReader(file));
        JSONObject json_object = (JSONObject) object;
        JSONArray nosql_dump_array = (JSONArray) json_object.get("NoSQL Dump");
        ArrayList<NoSQLInfoObject> nosql_info_list = new ArrayList<NoSQLInfoObject>();
        
        int record_id;
        String name;
        String cell_phone;
        String work_phone;
        String email;
        String address;
        int b_widget_order;
        int a_widget_order;
        boolean protection_plan;

        String address_street = null;
        String address_city = null;
        String address_state = null;
        String address_zip = null;

        String[] address_comma_split = null;
        String[] address_space_split = null;

        for(int i = 0; i < nosql_dump_array.size(); i++) {
        	Object inner_object = nosql_dump_array.get(i);
            JSONObject inner_json_object = (JSONObject) inner_object;
            record_id = getIntFromObject(inner_json_object.get("Record ID"));
            name = (String) inner_json_object.get("Name");
            cell_phone = (String) inner_json_object.get("Cell Phone");
            work_phone = (String) inner_json_object.get("Work Phone");
            email = (String) inner_json_object.get("Email");
            address = (String) inner_json_object.get("Address");
            b_widget_order = getIntFromObject(inner_json_object.get("Basic Widget Order"));
            a_widget_order = getIntFromObject(inner_json_object.get("Advanced Widget Order"));
            protection_plan = (Boolean) inner_json_object.get("Protection Plan");
            
            address_comma_split = address.split(", ");
            address_street = address_comma_split[0];
            //the following operations assume all addresses will be in the format "Street, City State Zipcode"
            address_space_split = address_comma_split[1].split(" ");
            address_city = getCityFromArray(address_space_split);
            address_state = address_space_split[address_space_split.length-2];
            address_zip = address_space_split[address_space_split.length-1];
            
            NoSQLInfoObject nosql_info_obj = new NoSQLInfoObject(record_id, name, cell_phone, work_phone, 
            		email, address, b_widget_order, a_widget_order, protection_plan, address_street, address_city, 
            		address_state, address_zip);

            nosql_info_list.add(nosql_info_obj);
        }
        
        createTables();
        populateTables(nosql_info_list);
        
    }
    
    //* Objective:	Prints insertion MySQL statements based on data from JSON file
    //* Parameters: ArrayList<NoSQLInfoObject> list - represents a list of NoSQLInfoObjects
    //				that contain the necessary information for each NoSQL record
    //* Returns: 	None
    private void populateTables(ArrayList<NoSQLInfoObject> list) {
    	int client_id = 1;
    	int address_id = 1;
    	int order_id = 1;
    	
//    	System.out.println("#########################################################");
//      System.out.println("#                 POPULATING TABLES                     #");
//      System.out.println("#########################################################");
    	
    	String order_type_basic_query = String.format("INSERT INTO `order_type` "
				+ "(`order_type`) VALUES ('%s');", "Basic Widget Order"); //id 1
		String order_type_advanced_query = String.format("INSERT INTO `order_type` "
				+ "(`order_type`) VALUES ('%s');", "Advanced Widget Order"); //id 0
		
		System.out.println(order_type_basic_query);
		System.out.println(order_type_advanced_query);
		
    	for(NoSQLInfoObject object: list) {
    		//object.printSQLObjectInfo();
    		String client_query = String.format("INSERT INTO `client` "
    				+ "(`name`, `cellphone`, `workphone`, `email`) VALUES ('%s', '%s', '%s', '%s');", 
    				object.getName(), object.getCell_phone(), object.getWork_phone(), object.getEmail());
    		System.out.println(client_query);
    		
    		String address_query = String.format("INSERT INTO `address` "
    				+ "(`street`, `city`, `state`, `zip_code`) VALUES ('%s', '%s', '%s', '%s');", 
    				object.getAddress_street(), object.getAddress_city(), object.getAddress_state(), object.getAddress_zip());
    		System.out.println(address_query);
    		
    		String client_address_query = String.format("INSERT INTO `client_address` "
    				+ "(`client_id`, `address_id`) VALUES (%d, %d);", client_id, address_id);
    		System.out.println(client_address_query);
    		
    		String order_basic_query = String.format("INSERT INTO `order` "
    				+ "(`protection_plan`, `type_id`) VALUES (%s, %d);", object.isProtection_plan() ? "TRUE" : "FALSE", 1);
    		System.out.println(order_basic_query);
    		
    		String record_basic_query = String.format("INSERT INTO `record` "
    				+ "(`client_id`, `order_id`) VALUES (%d, %d);", client_id, order_id);
    		System.out.println(record_basic_query);
    		
    		order_id+=1;
    		
    		String order_advanced_query = String.format("INSERT INTO `order` "
    				+ "(`protection_plan`, `type_id`) VALUES (%s, %d);", object.isProtection_plan() ? "TRUE" : "FALSE", 2);
    		System.out.println(order_advanced_query);
    		
    		String record_advanced_query = String.format("INSERT INTO `record` "
    				+ "(`client_id`, `order_id`) VALUES (%d, %d);", client_id, order_id);
    		System.out.println(record_advanced_query);
    		
    		order_id+=1;
    		client_id+=1;
    		address_id+=1;
    	}
    }
    
    //* Objective:	Prints hard-coded table creation MySQL statements based on schema
    //* Parameters: None
    //* Returns: 	None
    private void createTables() {
    	//System.out.println("CREATE SCHEMA `headstorm_challenge_rdb` ;"); //uncomment if schema must be created first
    	
//    	System.out.println("#########################################################");
//      System.out.println("#                  CREATING TABLES                      #");
//      System.out.println("#########################################################");
        System.out.println("CREATE TABLE `Client` (" +
            "\n\t`id` int NOT NULL AUTO_INCREMENT," +
            "\n\t`name` varchar(255) NOT NULL," +
            "\n\t`cellphone` varchar(255) NOT NULL," +
            "\n\t`workphone` varchar(255) NOT NULL," +
            "\n\t`email` varchar(255) NOT NULL," +
            "\n\tPRIMARY KEY (`id`)" +
        "\n);");

        System.out.println("CREATE TABLE `Address` (" +
            "\n\t`id` int NOT NULL AUTO_INCREMENT," +
            "\n\t`street` varchar(255) NOT NULL," +
            "\n\t`city` varchar(255) NOT NULL," +
            "\n\t`state` varchar(255) NOT NULL," +
            "\n\t`zip_code` varchar(255) NOT NULL," +
            "\n\tPRIMARY KEY (`id`)" +
        "\n);");

        System.out.println("CREATE TABLE `Record` (" +
            "\n\t`id` int NOT NULL AUTO_INCREMENT," +
            "\n\t`client_id` int NOT NULL," +
            "\n\t`order_id` int NOT NULL UNIQUE," +
            "\n\tPRIMARY KEY (`id`)" +
        "\n);");

        System.out.println("CREATE TABLE `Order` (" +
            "\n\t`id` int NOT NULL AUTO_INCREMENT," +
            "\n\t`protection_plan` bool NOT NULL," +
            "\n\t`type_id` int NOT NULL," +
            "\n\tPRIMARY KEY (`id`)" +
        "\n);");

        System.out.println("CREATE TABLE `Client_address` (" +
            "\n\t`client_id` int NOT NULL," +
            "\n\t`address_id` int NOT NULL," +
            "\n\tPRIMARY KEY (`client_id`,`address_id`)" +
        "\n);");

        System.out.println("CREATE TABLE `Order_type` (" +
            "\n\t`id` int NOT NULL AUTO_INCREMENT," +
            "\n\t`order_type` varchar(255) NOT NULL UNIQUE," +
            "\n\tPRIMARY KEY (`id`)" +
        "\n);");

        System.out.println("ALTER TABLE `Record` ADD CONSTRAINT `Record_fk_cid` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`);");
        System.out.println("ALTER TABLE `Record` ADD CONSTRAINT `Record_fk_oid` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`);");
        System.out.println("ALTER TABLE `Order` ADD CONSTRAINT `Order_fk_type` FOREIGN KEY (`type_id`) REFERENCES `Order_type`(`id`);");
        System.out.println("ALTER TABLE `Client_address` ADD CONSTRAINT `Client_address_fk_cid` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`);");
        System.out.println("ALTER TABLE `Client_address` ADD CONSTRAINT `Client_address_fk_aid` FOREIGN KEY (`address_id`) REFERENCES `Address`(`id`);\n");
    }
    
    //* Objective:	int values in JSON files have to be casted to LONG first
    //				before casting to primitive int. This function does that.
    //* Parameters: Object - represents the Object retrieved from JSON value
    //* Returns: 	int - the int represented by the JSON object
    private int getIntFromObject(Object object) {
    	Long temp_long;
    	temp_long = (Long) object;
    	return temp_long.intValue();
    }

    //* Objective:	Extracts the city from a String array. 
    //				Essentially concatenating elements until 2 are left (state, zip-code)
    //* Parameters: String[] str_array - the result of splitting address on " " (whitespace)
    //				ignoring anything before the "," (comma)
    //* Returns: 	String - the city 
    private String getCityFromArray(String[] str_array) {
        StringBuilder str_builder = new StringBuilder();
        for (int i = 0; i < (str_array.length - 2); i++) {
            str_builder.append(str_array[i]).append(" ");
        }
        //remove last space and convert to string
        return str_builder.deleteCharAt(str_builder.length() - 1).toString();
    }
    
    //* Objective:	Gets file from the Resources folder
    //* Parameters: String filename - represents the name of the resource
    //* Returns: 	File - the resource file
    private File getFileFromResources(String filename) {
        ClassLoader class_loader = getClass().getClassLoader();
        URL resource = class_loader.getResource(filename);
        if (resource == null) {
            throw new IllegalArgumentException("Error: file was not found!");
        } else {
            return new File(resource.getFile());
        }
    }


    public static void main(String args[]) {
    	DatabaseMigration db_migration = new DatabaseMigration();
    	File file = db_migration.getFileFromResources("NoSQL_records.json");
    	try {
    		db_migration.parseJsonFile(file);
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    }
}