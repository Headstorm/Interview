const fs = require('fs');

const intList = 'integer-list';
const numList = 'number-list';
const listLength = 500;
const intArr = [];
const numArr = [];

for (let i = 0; i < listLength; i++) {
  intArr.push(getRandIntIncl(-10000, 10000));
  numArr.push(getRandArbitraryNum(-10000, 10000));
}

writeListToFile(intArr, intList);
writeListToFile(numArr, numList);

function getRandArbitraryNum(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandIntIncl(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function writeListToFile(list, filename, listname, ext = '.data') {
  let l;
  let ln;
  let fn;

  if (!list || !filename) {
    return console.error(`Error: Call to function 'writeListToFile(list, filename, listname, ext = '.data')' missing one or more of required arguments 'list' and 'filename'.`);
  }

  // ln = (listname) ? listname : filename;
  ln = listname || filename;
  fn = filename + ext;

  l = `module.exports = [${list}];`;

  fs.writeFile(fn, l, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log(`List '${ln}' written to file '${fn}'.`);
  });
}

