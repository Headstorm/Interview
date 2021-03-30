import dbUtil.DBConnection;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 * This class is intended to migrate the data provided in the JSON, to a new data detail object then into the SQL DB
 *
 */
public class DBMigrate {
    public static void main(String[] args) throws Exception {
        JSONParser parser = new JSONParser();
        Object obj = parser.parse(new FileReader("C:\\Users\\Matt\\Desktop\\HeadStormDBChallenge\\src\\testJson"));
        JSONArray json = (JSONArray)obj;
        ArrayList<NewDataModel> datas = new ArrayList<>();

        for(int i = 0; i < json.size(); i++) {
           // parse the JSON and extract the data to insert into our new detail object
           JSONObject object = (JSONObject)json.get(i);
           String name = (String)object.get("Name");
           long record = (long)object.get("Record ID");
           int id = (int)record;
           String cell = (String)object.get("Cell Phone");
           String work = (String)object.get("Work Phone");
           String email = (String)object.get("Email");
           String address = (String)object.get("Address");
           long basic = (long)object.get("Basic Widget Order");
           int basicWidget = (int)basic;
           long advanced = (long)object.get("Advanced Widget Order");
           int advanced_widget = (int)advanced;
           boolean protection_plane = (Boolean)object.get("Protection Plan");
           // initialize the new data object with the extracted data
           datas.add(new NewDataModel(
               name,
               id,
               cell,
               work,
               email,
               address,
               basicWidget,
               advanced_widget,
               protection_plane
           ));
        }
        // establish the db connection
        Connection con = DBConnection.getConnection();
        // the mysql insert statement
        String query = " insert into data (id, name, cell, work, email, address, basicWidget, advanced_widget," +
                "protection_plan)"
                + " values (?, ?,?,?,?,?,?,?,?)";

        for (int i = 0; i < datas.size(); i++) {
            // create the mysql insert preparedstatement
            PreparedStatement preparedStmt = con.prepareStatement(query);
            System.out.println(query);
            preparedStmt.setInt(1, datas.get(i).getId());
            System.out.println("parameterIndex: 1, " + datas.get(i).getId());
            preparedStmt.setString(2, datas.get(i).getName());
            System.out.println("parameterIndex: 2, " + datas.get(i).getName());
            preparedStmt.setString(3, datas.get(i).getCell());
            System.out.println("parameterIndex: 3, " + datas.get(i).getCell());
            preparedStmt.setString(4, datas.get(i).getWork());
            System.out.println("parameterIndex: 4 , " + datas.get(i).getWork());
            preparedStmt.setString(5,datas.get(i).getAddress());
            System.out.println("parameterIndex: 5 , " + datas.get(i).getAddress());
            preparedStmt.setInt(6, datas.get(i).getBasicWidget());
            System.out.println("parameterIndex: 6 , " + datas.get(i).getBasicWidget());
            preparedStmt.setInt(7, datas.get(i).getAdvancedWidget());
            System.out.println("parameterIndex: 7 , " + datas.get(i).getAdvancedWidget());
            preparedStmt.setBoolean(8, datas.get(i).getProtectionPlan());
            System.out.println("parameterIndex: 8 , " + datas.get(i).getProtectionPlan());
            preparedStmt.setString(9, datas.get(i).getEmail());
            System.out.println("parameterIndex: 9 , " + datas.get(i).getEmail());
            preparedStmt.execute();
        }
        con.close();
    }
}

class NewDataModel {
    private String name;
    private int id;
    private String cell;
    private String work;
    private String email;
    private String address;
    private int basicWidget;
    private int advanced_widget;
    private boolean protection_plan;

    public NewDataModel(
            String name,
            int id,
            String cell,
            String work,
            String email,
            String address,
            int basicWidget,
            int advanced_widget,
            boolean protection_plan
    ){
        this.name =name;
        this.id = id;
        this.cell = cell;
        this.work = work;
        this.email = email;
        this.address = address;
        this.basicWidget = basicWidget;
        this.advanced_widget = advanced_widget;
        this.protection_plan = protection_plan;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public String getCell() {
        return cell;
    }

    public String getWork() {
        return work;
    }

    public String getAddress() {
        return address;
    }

    public int getBasicWidget() {
        return basicWidget;
    }

    public int getAdvancedWidget() {
        return advanced_widget;
    }

    public boolean getProtectionPlan() {
        return protection_plan;
    }

    public String getEmail() {
        return email;
    }
}



