/**
 * Submitted by Charmish Mojidra
 * Email Id: cmojidra@andrew.cmu.edu
 */

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class MigrateData {
    /**
     * System Generated Primary Keys for all three tables
    */
    long user_id = 1;
    long basic_order_id = 1;
    long advanced_order_id = 1;
    /**
     * HashMap is used for re-entering repeated users into users table
     */
    private Map<String, Long> map = new HashMap<>();


    public static void main(String[] args) {

        MigrateData migrateData = new MigrateData();

        System.out.println();
        System.out.println("CREATE TABLE QUERIES ARE: ");
        System.out.println();
        /**
         * Creating SQL tables
         */
        createTables();

        /**
         * Reading input json file and parsing the json object
         */
        JSONParser jsonParser = new JSONParser();

        try {
            FileReader reader = new FileReader("inputfile.txt");
            Object obj = jsonParser.parse(reader);

            JSONArray records = (JSONArray) obj;
            System.out.println();
            System.out.println("INSERT QUERIES ARE: ");
            System.out.println();
            for(int i = 0; i < records.size(); i++){
                JSONObject jsonObject = (JSONObject)records.get(i);
               migrateData.parseRecords(jsonObject);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    /**
     * Method to parse each record and generate insert queries
     */
    private void parseRecords(JSONObject record)
    {

        long record_id = (long) record.get("record_id");
        String name = (String) record.get("name");
        String cell_phone = (String) record.get("cell_phone");
        String work_phone = (String) record.get("work_phone");
        String email = (String) record.get("email");
        String address = (String) record.get("address");
        long basic_widget_order = (long) record.get("basic_widget_order");
        long advanced_widget_order = (long) record.get("advanced_widget_order");
        String protection_plan = (String) record.get("protection_plan");
        long repeated_user;
        String insertBasic="";
        String insertAdvanced="";
        /**
         * Checking if the user exists or not
         */
        if (!map.containsKey(email)){
            String insertUsers = "INSERT into users values(" + user_id + ", \"" + name + "\", \"" + work_phone+"\", \"" +
                    cell_phone+ "\", \"" + email + "\", \"" + address + "\", " + protection_plan +" );";
            System.out.println(insertUsers);
            map.put(email,user_id);
            insertBasic = "INSERT into basic_orders values(" + basic_order_id + ", " + user_id + ", " + basic_widget_order + " );";
            insertAdvanced = "INSERT into advanced_orders values(" + advanced_order_id + ", " + user_id + ", " + advanced_widget_order +" );";
            user_id++;
        }
        else{
            repeated_user = map.get(email);
            insertBasic = "INSERT into basic_orders values(" + basic_order_id + ", " + repeated_user + ", " + basic_widget_order + " );";
            insertAdvanced = "INSERT into advanced_orders values(" + advanced_order_id + ", " + repeated_user+", " + advanced_widget_order + " );";
        }


        basic_order_id++;
        advanced_order_id++;
        System.out.println(insertBasic);
        System.out.println(insertAdvanced);
    }

    /**
     * Method for generating create table queries
     */
    private static void createTables(){
        String create_user_table = "CREATE TABLE users (\n" +
                "user_id bigint PRIMARY KEY,\n" +
                "name varchar(30) NOT NULL,\n" +
                "work_phone varchar(10),\n" +
                "cell_phone varchar(10),\n" +
                "email varchar(40),\n" +
                "address varchar(100),\n" +
                "protection_plan BOOLEAN\n" +
                ");";

        String create_basic_orders_table = "\n" +
                "CREATE TABLE basic_orders (\n" +
                "basic_order_id bigint PRIMARY KEY,\n" +
                "user_id bigint FOREIGN KEY REFERENCES users,\n" +
                "basic_widget_order integer\n" +
                ");";

        String create_advanced_orders_table = "CREATE TABLE advanced_orders (\n" +
                "advanced_order_id bigint PRIMARY KEY,\n" +
                "user_id bigint FOREIGN KEY REFERENCES users,\n" +
                "advanced_widget_order integer\n" +
                ");";

        System.out.println(create_user_table);
        System.out.println(create_basic_orders_table);
        System.out.println(create_advanced_orders_table);


    }
}
