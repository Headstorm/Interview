CREATE DATABASE users;
USE users;

CREATE TABLE contact (
  Record_ID INTEGER NOT NULL,
  Full_Name VARCHAR(255) NOT NULL,
  Cell_Phone VARCHAR(255),
  Work_Phone VARCHAR(255),
  Email VARCHAR(255),
  Address VARCHAR(255),

  PRIMARY KEY (Record_ID) 
);

CREATE TABLE widget (
  Record_ID INTEGER NOT NULL,
  Basic_Widget_Order INTEGER(10),
  Advanced_Widget_Order INTEGER(10),
  Protection_Plan BOOLEAN,

  PRIMARY KEY(Record_ID)
);