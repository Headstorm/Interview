# Database Model Visualization

| Field | Type |  Null  |  KEY  | Constraints |
|  ---  | ---  |  ---   |  ---  |     ---     |
| Record_ID | int | Not Null | PK |  Unique   |
| Name | nvarchar(255) |  Not Null  |   |   |       |
| CellPhone | nvarchar(20) |   |   |        |
| WorkPhone | nvarchar(20) |    |   |    |
| Email | nvarchar(50) |   |  Not Null  |  Unique  |
| Address | nvarchar(255) |  Not Null  |   |
| BasicWidgetOrder | int |   | Not Null   |  |
| AdvancedWidgetOrder | int |   |  Not Null  | |
| ProtectionPlan | bit |   | Not Null  |    |