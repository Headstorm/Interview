CREATE DATABASE Startup;
USE Startup;
CREATE TABLE `Order`(RecordID INT(4) PRIMARY KEY, `Name` VARCHAR(60), CellPhone VARCHAR(15), WorkPhone VARCHAR(15), Email VARCHAR(30), Address VARCHAR(60), BasicWidgetOrder INT(3), AdvancedWidgetOrder INT(3), ProtectionPlan BOOLEAN DEFAULT false);
INSERT INTO `Order` VALUES(1234, 'Joe Smith', '405.867.5309', '123.123.1234', 'joe_s@gmail.com', '123 Vic Way, Dallas TX 75001', 37, 12, True);
SELECT * FROM `Order`;