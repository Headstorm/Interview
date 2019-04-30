package dataInput;
import java.io.IOException;
import java.io.*;
import java.util.Properties;

public class migrate { 

	     // export
	     public static void exportSql() throws IOException{
	         Properties properties = new Properties();  
	         //  read the properties file
	         properties.load(Import.class.getClassLoader().getResourceAsStream("jdbc.properties")); 
	         Runtime runtime = Runtime.getRuntime();  
	         String command = getExportCommand(properties);  
	         
	         runtime.exec(command)£» 
	     }
	     // import
	    public static void importSql() throws IOException { 
	        Properties properties = new Properties();  
	        //  read the properties file
	        properties.load(Import.class.getClassLoader().getResourceAsStream("jdbc.properties")); 

	        Runtime runtime = Runtime.getRuntime();  
	        //  store command as string array
	        String cmdarray[] = getImportCommand(properties);  
	        Process process = runtime.exec(cmdarray[0]);  

	        // use mysql command  

	        java.io.OutputStream os = process.getOutputStream();  
	        OutputStreamWriter writer = new OutputStreamWriter(os);  
	        
	        writer.write(cmdarray[1] + "\r\n" + cmdarray[2]); 
	        writer.flush();  
	        writer.close();  
	        os.close();  
	    }  

	     private static String[] getImportCommand(Properties properties) {  

	            String username = properties.getProperty("jdbc.username");//username  
	            String password = properties.getProperty("jdbc.password");//password  
	            String host = properties.getProperty("jdbc.host");//host  
	            String port = properties.getProperty("jdbc.port");//port  
	            String importDatabaseName = properties.getProperty("jdbc.importDatabaseName");//destination  
	            String importPath = properties.getProperty("jdbc.importPath");//address  
	            String MysqlPath = properties.getProperty("MysqlPath"); //  address of mysql bin

	            //use login command  
	            String loginCommand = new StringBuffer().append(MysqlPath).append("mysql -h").append(host).append(" -u").append(username).append(" -p").append(password)  
	            .append(" -P").append(port).toString(); 
	            //use switch command
	            String switchCommand = new StringBuffer().append("use ").append(importDatabaseName).toString();  
	            //use import command 
	            String importCommand = new StringBuffer(" source ").append(importPath).toString();             

	           String[] commands = new String[] {loginCommand, switchCommand, importCommand};

	            return commands;  
	        }  

	      private static String getExportCommand(Properties properties) {  

	            StringBuffer command = new StringBuffer();  
	            String username = properties.getProperty("jdbc.username");//user
	            String password = properties.getProperty("jdbc.password");//password 
	            String exportDatabaseName = properties.getProperty("jdbc.exportDatabaseName");//name  
	            String host = properties.getProperty("jdbc.host");//localhost  
	            String port = properties.getProperty("jdbc.port");//port 
	            String exportPath = properties.getProperty("jdbc.exportPath");//address
	            String MysqlPath = properties.getProperty("MysqlPath"); //  address of mysql bin
 
	            command.append(MysqlPath).append("mysqldump -u").append(username).append(" -p").append(password)//p--password, P--port  
	            .append(" -h").append(host).append(" -P").append(port).append(" ").append(exportDatabaseName).append(" -r ").append(exportPath);  

	            return command.toString();  
	        }
	}
}
