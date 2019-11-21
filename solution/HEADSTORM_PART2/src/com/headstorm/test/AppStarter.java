package com.headstorm.test;

import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig; 
//For startng our application and importing the required packages. 
@ApplicationPath("/")
public class AppStarter extends ResourceConfig {               

    public AppStarter() {
        packages("com.headstorm.test");
        packages("com.google.gson");
    }
}