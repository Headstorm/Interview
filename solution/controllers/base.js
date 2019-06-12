exports.getRoot = (req, res, next) => {
  res.render('index', {
    title: 'Tristram'
  });
};

exports.getContact = (req, res, next) => {
  res.render('contact', {
    title: 'Tristram'
  });
};

exports.getData = (req, res, next) => {
  let data = req.query.data;
  let sorted = [];

  if (!data) {
    sorted = ['No numbers to display yet!'];
  } else {
    for(let num of data.split(',')) {
      sorted.push(num);
    }
  }

  res.render('data', {
    title: 'Back End Challenge',
    data: sorted
  })
}

exports.postContact = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res.send({...req.body});
};

// This logic should be abstracted out of the controller and into a model
// We aren't working with a DB and the application is small, so I decided to leave it in the controller
exports.postData = (req, res, next) => {
  let input = req.body.data;
  let userKey = '';
  
  // Check if user input is blank to prevent nasty errors from displaying
  if (!input) {
    return res.send('An error occured. Is your input formatted properly?');
  }
  
  // Catch any error from the attempt to parse user input into JSON
  try {
    input = JSON.parse(input)
  } catch(err) {
    return res.send('An error occured. Is your input formatted properly?');
  }

  // Grab the title of the first key from input
  // The user could have named it anything (nums, myList, etc..)
  for (let key in input) {
    userKey = key;
    break;
  }

  if (!input[userKey] || input[userKey].length !== 500) {
    res.send('There must be exactly 500 numbers in a JSON formatted list!')
  } else {
    const sorted = input[userKey].sort((a, b) => a - b);
    res.redirect('/data?data=' + sorted);
  }
};