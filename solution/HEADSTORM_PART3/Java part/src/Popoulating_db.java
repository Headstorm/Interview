import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.List;

// For using Gson to read and convert JSON file to java objects.
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class Popoulating_db {

    // JDBC URL, username and password of MySQL server
    private static final String url = "jdbc:mysql://localhost:3306/STARTUP_ORDER_DB";
  //please insert your username and password for your JDBC here.
    private static final String user = "root"; 
    private static final String password = "Vhemanth99"; 

    // JDBC variables for opening and managing connection
    private static Connection con;
    private static Statement stmt;
    private static ResultSet rs;

    public static void main(String args[]) throws IOException {
        
        Gson gson = new Gson();
        try (Reader reader = new FileReader("C:\\Users\\Hemanth Velaga\\Desktop\\HEADSTORM\\PART 3\\sample.json")) {

            // Convert JSON File to Java Object
            List<Transaction_Record> recordlist = gson.fromJson(reader, new TypeToken<List<Transaction_Record>>() {}.getType());

            try {
            	 
                // opening database connection to MySQL server
                con = DriverManager.getConnection(url, user, password);

                // getting Statement object to execute query
                stmt = con.createStatement();
                
                //inserting every json record into relational database using "insertrecord" stored procedure.
                for(Transaction_Record record:recordlist)
                {                	
                	System.out.print(record.Record_ID);
                	String plsqlSatement = "{call insertrecord(?,?,?,?,?,?,?,?,?) }";            		

            		CallableStatement statement = con.prepareCall(plsqlSatement);
            		statement.setInt(1,record.Record_ID);
            		statement.setString(2,record.Name);
            		statement.setString(3,record.Cell_Phone);
            		statement.setString(4,record.Work_Phone);
            		statement.setString(5,record.Email);
            		statement.setString(6,record.Address);
            		statement.setInt(7,record.Basic_Widget_Order);
            		statement.setInt(8,record.Advanced_Widget_Order);
            		statement.setBoolean(9,record.Protection_Plan);
            		statement.execute();
                }
                String query = "select count(*) from ORDERTABLE";
                rs = stmt.executeQuery(query);
                while (rs.next()) {
                    int count = rs.getInt(1);
                    System.out.println("Total number of records inserted : " + count);
                }
                
            } catch (SQLException sqlEx) {
                sqlEx.printStackTrace();
            } finally {
                //close connection ,stmt and resultset here
                try { con.close(); } catch(SQLException se) { /*can't do anything */ }
                try { stmt.close(); } catch(SQLException se) { /*can't do anything */ }
                try { rs.close(); } catch(SQLException se) { /*can't do anything */ }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        
        }
   

}
