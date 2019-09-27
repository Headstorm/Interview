// import and parse data from the json file
var fs = require('fs')
var data = fs.readFileSync('MOCK_DATA.json', 'utf8')
var records = JSON.parse(data)


convertToSQLRequest(records)

function convertToSQLRequest(records) {

    // print the json file that was read in
    console.log(records)
    console.log('\n\n')
    
    // maps the records in the json file and prints to console the database insert command 
    records.map(
        (record) => console.log(
            `INSERT INTO RECORDS(RECORD_ID, NAME, CELL_PHONE, WORK_PHONE, EMAIL, ADDRESS, BASIC_WIDGET_ORDER, ADVANCED_WIDGET_ORDER, PROTECTION_PLAN)
VALUES(${record.Record_ID}, ${record.Name}, ${record.Cell_Phone}, ${record.Work_Phone}, ${record.Email}, ${record.Address}, ${record.Basic_Widget_Order}, ${record.Advanced_Widget_Order}, ${record.Protection_Plan});`

        )
    )


}
