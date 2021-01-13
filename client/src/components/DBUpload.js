import React, { Component } from 'react';
import * as DBData from './DBData.json';

// recieves NoSQL JSON data and returns the appropriate SQL insert statements
export function DBUpload() {
    // pulls data from the local JSON file
    let data = (DBData.default);
    // displays what the file contained
    console.log("Submitted DB JSON file data: ", JSON.stringify(data));

    // iterates through each table and performs the necessary SQL insert statements
    for (var i in data) {
        var info = data[i];

        // displays the SQL statements
        // sorry I know it looks scary
        console.log("SQL code: \nINSERT INTO CustomerInfo (record_ID, name, cellphone, workphone, email, address) VALUES (" + info.record_ID + ", \"" + info.name + "\", \"" + info.cellphone + "\", \"" + info.workphone + "\", \"" + info.email + "\", \"" + info.address + "\")");
        console.log("\nSQL code: \nINSERT INTO CustomerProductInfo (record_ID, basic_widget_order, advanced_widget_order, protection_plan) VALUES (" + info.record_ID + ", " + info.basic_widget_order + ", " + info.advanced_widget_order + ", \"" + info.protection_plan + "\")");
    }
}

