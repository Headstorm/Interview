package org.challenge;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class App {
    public static void main(String[] args) {
        if (args.length < 1){
            System.out.println("Provide json file");
            System.exit(0);
        }
        processJSON(args[0]);
    }

    private static void processJSON(String filename) {
        JSONParser parser = new JSONParser();
        Path path = Paths.get(filename);
        String content = null;
        JSONArray jsonArray = null;
        try {
            byte[] encoded = Files.readAllBytes(path);
            content = new String(encoded);
            jsonArray = (JSONArray) parser.parse(content);
        }catch (FileNotFoundException e){
            System.out.printf("File: \"%s\" Not found.\n", filename);
            System.exit(1);
        } catch (IOException | ParseException e) {
            e.printStackTrace();
            System.exit(1);
        }
        for (Object o : jsonArray) {
            JSONObject user = (JSONObject) o;
            String userInsert = String.format(
                    "INSERT INTO users (record_id, name, email, cell_phone, work_phone, address, protection_plan)" +
                            "VALUES (%d, %s, %s, %s, %s, %s, %b)",
                    (Long) user.get("Record ID"),
                    user.get("Name"),
                    user.get("Email"),
                    user.get("Cell Phone"),
                    user.get("Work Phone"),
                    user.get("Address"),
                    user.get("Protection Plan")
            );
            String widgetInsert = String.format("INSERT INTO widgets (advanced_order, basic_order, user_record_id) " +
                            "VALUES (%d, %d, %d)",
                    (Long) user.get("Advanced Widget Order"),
                    (Long) user.get("Basic Widget Order"),
                    (Long) user.get("Record ID")
            );
            System.out.println(userInsert);
            System.out.println(widgetInsert);
        }
    }
}
