//noSql structure
// let db = {
//   records: [
//     {
//       recordId: 1234,
//       name: "Joe Smith",
//       cellPhone: "405.867.5309",
//       workPhone: "123.123.1234",
//       phone: "joe_s@gmail.com",
//       address: "123 Vic Way, Dallas TX 75001",
//       basicWidgetOrder: 37,
//       advancedWidgetOrder: 12,
//       protectionPlan: true
//     }
//   ]
// };

//RELATIONSHIPS
//USER --< ORDERS

//SQL DB JSON STRUCTURE
// sqlDb = {
//   users:
//     [
//       {
//         id: number,
//         name: string,
//         cellPhone: string,
//         WorkPhone: string,
//         email: string,
//         address: string
//       }
//     ],
//   orders:
//   [
//     {
//       id: number,
//       userId: number,
//       recordId: number,
//       basicWidgetQty: number ("default zero"),
//       advancedWidgetQty: number ("default zero"),
//       protectionPlan: Boolean
//     }
//   ]
// }
///////////////////////////////////////
///////////////////////////////////////

let noSqlDb = {
  records: [
    {
      recordId: 1234,
      name: "Joe Smith",
      cellPhone: "405.867.5309",
      workPhone: "123.123.1234",
      email: "joe_s@gmail.com",
      address: "123 Vic Way, Dallas TX 75001",
      basicWidgetOrder: 37,
      advancedWidgetOrder: 12,
      protectionPlan: true
    },
    {
      recordId: 1235,
      name: "Chris Snyder",
      cellPhone: "867.539.1302",
      workPhone: "190.322.8901",
      email: "chris@gmail.com",
      address: "23 Some Where, Houston TX 75077",
      basicWidgetOrder: 20,
      advancedWidgetOrder: 9,
      protectionPlan: false
    },
    {
      recordId: 1236,
      name: "Joe Smith",
      cellPhone: "405.867.5309",
      workPhone: "123.123.1234",
      email: "joe_s@gmail.com",
      address: "123 Vic Way, Dallas TX 75001",
      basicWidgetOrder: 50,
      advancedWidgetOrder: 23,
      protectionPlan: true
    }
  ]
};
//////////////////////////////////////
/////////////////////////////////////

let sqlDb = {
  users: [],
  orders: []
};
let userCounts = {};

function userCounter(record) {
  let email = record.email;
  userCounts[email] = (userCounts[email] || 0) + 1;
}

function convertUsersToSql(noSqlDbRecords) {
  let i = 0;
  noSqlDbRecords.forEach(record => {
    userCounter(record);
    if (userCounts[record.email] === 1) {
      i += 1;
      sqlDb.users.push({
        id: i,
        username: record.name,
        cellphone: record.cellPhone,
        workphone: record.workPhone,
        email: record.email,
        address: record.address
      });
    }
  });
}

function pairEmailsToUserIds(users) {
  let userIdByEmail = {};
  users.forEach(user => (userIdByEmail[user.email] = user.id));
  return userIdByEmail;
}

function userIdMatcher(record) {
  for (userEmail in userIdByEmail) {
    if (userEmail === record.email) {
      return userIdByEmail[userEmail];
    }
  }
}

function convertOrdersToSql(noSqlDbRecords) {
  let i = 0;
  userIdByEmail = pairEmailsToUserIds(sqlDb.users);
  noSqlDbRecords.forEach(record => {
    sqlDb.orders.push({
      recordId: record.recordId,
      userId: userIdMatcher(record),
      basicWidgetQty: record.basicWidgetOrder ? record.basicWidgetOrder : 0,
      advancedWidgetQty: record.advancedWidgetOrder
        ? record.advancedWidgetOrder
        : 0,
      protectionPlan: record.protectionPlan
    });
  });
  console.log(sqlDb);
  return sqlDb;
}

function sqlDbConverter(noSqlDbRecords) {
  convertUsersToSql(noSqlDbRecords);
  convertOrdersToSql(noSqlDbRecords);
}

//////////////////////////////////////////////////
/////////////////////////////////////////////////

sqlDbConverter(noSqlDb.records);

//In console run node databaseChallenge.js
