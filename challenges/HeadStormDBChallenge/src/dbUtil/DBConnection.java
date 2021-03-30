package dbUtil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String USERNAME = "dbuser";
    private static final String PASS = "dbpassword";
    private static final String CON = "jdbc:mysql://localhost/login";
    private static final String SQCON = "jdbc:sqlite:data.sqlite";

    public static Connection getConnection() throws SQLException {
        try{
            Class.forName("org.sqlite.JDBC");
            return DriverManager.getConnection(SQCON);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

}
