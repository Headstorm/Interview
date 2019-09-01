/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// ENVIRONMENT
require('dotenv').config();

// DEPENDENCIES
const axios = require('axios');
const faker = require('faker');
const fs = require('fs');
const moment = require('moment');
const Promise = require('bluebird');
const { apiHost } = require('./config');
const demoUsername = require('./demo-guest-user');

// VARIABLES
const numOfUsers = 30;
const fixedEntries = 50;
const maximumEntries = 0;
const minimumEntries = 0;

let fileFormattedCredentials = '';

// FUNCTIONS (ABC)
function within24Hours() {
  const hours = 24 * Math.random();
  return moment().add(hours, 'hours').format('YYYY-MM-DD HH:mm:ss+00');
}

function generateUsers(nUsrs, users = [], isdemoUsername = false) {
  const offset = (isdemoUsername) ? 1 : 0;
  console.log('offset:', offset);
  for (let i = 1; i <= nUsrs; i += 1) {
    const user = {
      userId: i + offset,
      username: faker.internet.email(),
      password: faker.internet.password(),
    };
    users.push(user);
  }
  return users;
}

function generateEntries(users, nFxdEntries, minEntries, maxEntries) {
  let numOfUserEntries;

  if (nFxdEntries) {
    numOfUserEntries = nFxdEntries;
  }

  const usersWithEntries = users.map((user) => {
    const mappedUser = {
      userId: user.userId,
      username: user.username,
      password: user.password,
      entries: [],
    };
    if (!nFxdEntries) {
      numOfUserEntries = faker.random.number({ min: minEntries, max: maxEntries });
    }
    for (let e = 0; e < numOfUserEntries; e += 1) {
      const creationDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss+00');
      const releaseDate = Math.random() < 0.5
        ? within24Hours()
        : moment(faker.date.future()).format('YYYY-MM-DD HH:mm:ss+00');
      const entry = {
        userId: user.userId,
        creationDate,
        releaseDate,
        description: faker.lorem.words(
          Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1)) + Math.ceil(1),
        ),
        content: faker.lorem.sentence(),
      };
      mappedUser.entries.push(entry);
    }
    return mappedUser;
  });
  // users.forEach((user) => {
  //   if (!nFxdEntries) {
  //     numOfUserEntries = faker.random.number({ min: minEntries, max: maxEntries });
  //   }
  //   for (let e = 0; e < numOfUserEntries; e += 1) {
  //     const creationDate = moment(faker.date.past()).format('YYYY-MM-DD HH:mm:ss+00');
  //     const releaseDate = Math.random() < 0.5
  //       ? within24Hours()
  //       : moment(faker.date.future()).format('YYYY-MM-DD HH:mm:ss+00');
  //     const entry = {
  //       userId: user.userId,
  //       creationDate,
  //       releaseDate,
  //       description: faker.lorem.words(
  //         Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1) + 1)) + Math.ceil(1),
  //       ),
  //       content: faker.lorem.sentence(),
  //     };
  //     user.entries.push(entry);
  //   }
  // });

  return usersWithEntries;
}

function formatCredentialsAsString(usersCredentials) {
  const concatCred = (accumCreds, user) => (
    `${accumCreds}\nusername: '${user.username}',\npassword: '${user.password}',\n`
  );
  return usersCredentials.reduce(concatCred, '');
}

function writeDataToFile(data) {
  console.log(data);
  fs.writeFile('fake-credentials.data', data, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log('Mock user credentials written to \'demo-fake-credentials.data\'');
  });
}

// MAIN

faker.seed(123);
let users = generateUsers(numOfUsers, [], true);
users = generateEntries(users, fixedEntries, minimumEntries, maximumEntries);

if (demoUsername) {
  users.unshift(demoUsername);
}

console.clear();
console.table(users, ['username', 'password']);
users.forEach((user) => {
  console.table(user.entries, ['userId', 'creationDate', 'releaseDate', 'description']);
});

fileFormattedCredentials = formatCredentialsAsString(users);
writeDataToFile(fileFormattedCredentials);

console.log(apiHost);
Promise.each(
  users, user => axios.post(
    `${apiHost}/api/db/signup`,
    { username: user.username, password: user.password },
  )
    .then(() => console.log(user.username, user.password))
    .then(() => (Promise.each(
      user.entries,
      entry => axios.post(`${apiHost}/api/db/entries`, {
        userId: entry.userId,
        creationDate: entry.creationDate,
        releaseDate: entry.releaseDate,
        description: entry.description,
        content: entry.content,
      })
        .then(() => console.log(
          entry.userId,
          entry.creationDate,
          entry.releaseDate,
          entry.description,
          entry.content,
        )),
    ))).then(() => console.log('done')),
  ).catch(err => console.log(err));

/*
  • This script requires a .pg_service.conf file to be
    located in the home directory with the following
    contents:
      [tldb]
      dbname=postgres
      host=localhost
      port=5432
      user=jeh
      password=1445

  • Users should be logging in under user credentials,
    not with 'jeh'

  • Dev server needs to be running
*/
