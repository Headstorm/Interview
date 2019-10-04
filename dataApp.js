

const fs = require("fs");

const data = JSON.parse(
    fs.readFileSync(`${__dirname}/data.json`, 'utf8')
);
const tableName = "Customer";

const createTableStatement = `CREATE  TABLE ${tableName} ( 
                            RecordID  int NOT NULL,
                            Name varchar(15) NOT NULL,
                            CellPhone varchar(15),
                            WorkPhone varchar(15),
                            Email nvarchar(255),
                            Address varchar(255),
                            BasicWidgetOrder int,
                            AdvancedWidgetOrder int,
                            ProtectionPlan Boolean,
                            PRIMARY KEY (RecordID)
                            )`;
      
console.log(createTableStatement + "\n");  

data.map(record => (
    console.log(`INSERT INTO ${tableName} (RecordID, Name, CellPhone, WorkPhone, Email, Address, BasicWidgetOrder, AdvancedWidgetOrder, ProtectionPlan)
        VALUES(${record.Record_ID}, '${record.Name}', '${record.Cell_Phone}', '${record.Work_Phone}', '${record.Email}', '${record.Address}', ${record.Basic_Widget_Order}, ${record.Advanced_Widget_Order}, ${record.Protection_Plan});\n`
    )
));


