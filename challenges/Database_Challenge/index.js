var fs = require('fs');

function jsonToObj(row) {
    const record = JSON.parse(row)
    var d = new Object();
    d["id"] = Number(record.Record_ID)
    d["name"] = record.Name
    d["cellphone"] = record.Cell_Phone
    d["workphone"] = record.Work_Phone
    d["email"] = record.Email
    d["address"] = record.Address
    d["basic_widget"] = Number(record.Basic_Widget_Order)
    d["advanced_widget"] = Number(record.Advanced_Widget_Order)
    d["protection"] = Boolean(record.Protection_Plan)
    return d
}

function postgresInsertCustomer(d, tableName) {
return `INSERT INTO ${tableName}
        VALUES (${d["id"]},
        '${d["name"]}',
        '${d["cellphone"]}',
        '${d["workphone"]}', 
        '${d["email"]}',
        '${d["address"]}'
        );`
}

function postgresInsertWidget(d, tableName) {
return `INSERT INTO ${tableName}
        VALUES (${d["id"]},
        ${d["basic_widget"]},
        ${d["advanced_widget"]},
        ${d["protection"]}
        );`
}

function main() {
    const sample = fs.readFileSync("nosql.json")
    dict = jsonToObj(sample)
    const customer = postgresInsertCustomer(dict, "customers")
    const widget = postgresInsertWidget(dict, "widgets") 
    fs.writeFileSync("psqlOut.txt", customer + '\n \n' + widget)
}

main()


/*

Reference queries to create tables (PostgreSQL):

`
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cellphone VARCHAR(12),
    workphone VARCHAR(12),
    email VARCHAR(255),
    address VARCHAR(255)
    )

`
`
CREATE TABLE widgets (
    id SERIAL PRIMARY KEY,
    basic_widget INTEGER,
    advanced_widget INTEGER,
    protection BOOLEAN
    )
`
*/