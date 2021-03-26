--Insert New Users
INSERT INTO dbo.Users (UserId, Name, CellPhone, WorkPhone, Email, Address)
VALUES (1, 'Joe Smith', '405.867.5309', '123.123.1234', 'joe_w@gmail.com', '123 Vic Way, Dallas TX 75001');
INSERT INTO dbo.Users (UserId, Name, CellPhone, WorkPhone, Email, Address)
VALUES (2, 'Ben Douthit', '940.391.7596', '123.123.1234', 'bendouthit31@gmail.com', '15480 Dallas Parkway, Dallas TX 75248');

--Insert New Orders
INSERT INTO dbo.Orders (RecordId, UserId, BasicWidgetOrder, AdvancedWidgetOrder, ProtectionPlan)
VALUES (1234, 1, 37, 12, 1);
INSERT INTO dbo.Orders (RecordId, UserId, BasicWidgetOrder, AdvancedWidgetOrder, ProtectionPlan)
VALUES (1235, 2, 38, 13, 1);
