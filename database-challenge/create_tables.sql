IF OBJECT_ID('dbo.Customers') IS NULL
    CREATE TABLE dbo.Customers (
        UserId int not null PRIMARY KEY,
        Name varchar(255) not null,
        CellPhone varchar(12) not null,
        WorkPhone varchar(12) not null,
        Email varchar(255) not null,
        Address varchar(255) not null
    );

IF OBJECT_ID('dbo.Orders') IS NULL
    CREATE TABLE dbo.Orders (
        RecordId int not null,
        UserId int FOREIGN KEY REFERENCES dbo.Customers(UserId),
        BasicWidgetOrder int null,
        AdvancedWidgetOrder int null,
        ProtectionPlan bit null
    );

