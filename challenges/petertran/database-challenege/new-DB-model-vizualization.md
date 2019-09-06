# SQL Database Model Visualization

| Field | Type |  Null  |  KEY  | Constraints |
|  ---  | ---  |  ---   |  ---  |     ---     |
| RecordID | int | Not Null | PK |  Unique   |
| Name | nvarchar(255) |  Not Null  |   |   |       |
| CellPhone | nvarchar(255) |   |   |        |
| WorkPhone | nvarchar(255) |    |   |    |
| Email | nvarchar(255) |  Not Null  |    |  Unique  |
| Address | nvarchar(255) |  Not Null  |   |
| BasicWidgetOrder | int |  Not Null  |    |  |
| AdvancedWidgetOrder | int |  Not Null  |    | |
| ProtectionPlan | bit |  Not Null  |   |    |