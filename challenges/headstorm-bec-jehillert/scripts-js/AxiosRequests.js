import axios from 'axios';
import { hostUrl } from 'config';

module.exports = function (req, res) {
  var data = numArr;

  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    console.log('POST data received');
    res.writeHead(200, {
      'Content-Type': 'text/json'
    });
    res.write(JSON.stringify(data));
    res.end();
  });
};
