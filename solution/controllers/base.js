exports.getRoot = (req, res, next) => {
  res.render('index', {
    title: 'Tristram'
  });
}

exports.getContact = (req, res, next) => {
  res.render('contact', {
    title: 'Tristram'
  });
}

exports.postContact = (req, res, next) => {
  console.log(JSON.stringify(req.body));
  res.send({...req.body});
}