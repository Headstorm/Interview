CREATE TABLE "Person"{

 "RecordID" NUMBER NOT NULL PRIMARY KEY,
 "Name" VARCHAR(40) NOT NULL,
 "CPhone" CHAR(12),
 "WPhone" CHAR(12),
 "Email" VARCHAR(40),
 "Address" VARCHAR(40),
 "BasicWidgetO" NUMBER,
 "AdvWidgetO" NUMBER,
 "ProtectPlan" BOOLEAN
 FOREIGN KEY ("UserID") REFERENCES "Record"("UserID")
 };
