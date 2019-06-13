const fs = require('fs');
const formidable = require('formidable');
const chalk = require('chalk');

//--- GET ---//

exports.getRoot = (req, res, next) => {
	res.render('index', {
		title: 'Tristram'
	});
};

exports.getContact = (req, res, next) => {
	res.render('contact', {
		title: 'Captcha V3',
		post: '/captcha',
		captcha: res.recaptcha,
		path: req.path
	});
};

exports.getData = (req, res, next) => {
	let data = req.query.data;
	let sorted = [];

	if (!data) {
		sorted = ['No numbers to display yet!'];
	} else {
		for (let num of data.split(',')) {
			sorted.push(num);
		}
	}

	res.render('data', {
		title: 'Back End Challenge',
		data: sorted
	});
};

exports.getMigrate = (req, res, next) => {
	res.render('migrate', {
		title: 'DB Migration'
	});
};

//--- POST ---//

exports.postContact = (req, res, next) => {
	console.log('Form: ', JSON.stringify(req.body));
	res.send({ ...req.body });
};

exports.postCaptcha = (req, res, next) => {
	res.render('contact', {
		title: 'Contact Form',
		post: '/captcha',
		error: req.recaptcha.error,
		path: req.path,
		data: JSON.stringify(req.recaptcha.data)
	});
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
		input = JSON.parse(input);
	} catch (err) {
		return res.send('An error occured. Is your input formatted properly?');
	}

	// Grab the title of the first key from input
	// The user could have named it anything (nums, myList, etc..)
	for (let key in input) {
		userKey = key;
		break;
	}

	if (!input[userKey] || input[userKey].length !== 500) {
		res.send('There must be exactly 500 numbers in a JSON formatted list!');
	} else {
		const sorted = input[userKey].sort((a, b) => a - b);
		res.redirect('/data?data=' + sorted);
	}
};

exports.postMigrate = (req, res, next) => {
	new formidable.IncomingForm().parse(req, (err, fields, files) => {
		if (err) {
			console.error('Error', err);
			res.send('Error!');
		}

		const filePath = files.file.path;

		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) {
				return console.log;
			}
			generateSQL(data);
			return res.send('SQL statements for migration are in your Node console!');
		});
	});
};

//--- HELPER FUNCTIONS ---//

function generateSQL(json) {
	const SQL = [];
	const basicWidgets = [];
	const advancedWidgets = [];
	let users = JSON.parse(json).users;

	SQL.unshift(`CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    name char(255),
    cell_phone char(12),
    work_phone char(12),
    email char(255),
    address char(255),
    protection_plan boolean,
    basic_widget_id int,
    advanced_widget_id int,
    PRIMARY KEY (id)
  );`);

	for (let user of users) {
		basicWidgets.push(user.basic_widget);
		advancedWidgets.push(user.advanced_widget);
		SQL.push(
			`INSERT INTO user (name, cell_phone, work_phone, email, address, protection_plan, basic_widget_id, advanced_widget_id) VALUES ("${user.name}", "${user.cell_phone}", "${user.work_phone}", "${user.email}", "${user.address}", ${user.protection_plan}, ${user.basic_widget}, ${user.advanced_widget});`
		);
	}

	for (let id of [...new Set(basicWidgets)]) {
		SQL.unshift(`INSERT INTO basic_widget (id) VALUES (${id});`);
	}

	for (let id of [...new Set(advancedWidgets)]) {
		SQL.unshift(`INSERT INTO advanced_widget (id) VALUES (${id});`);
	}

	SQL.unshift(`CREATE TABLE basic_widget (
    name char(255),
    id int NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
  );`);

	SQL.unshift(`CREATE TABLE advanced_widget (
    id int NOT NULL AUTO_INCREMENT,
    name char(255),
    PRIMARY KEY (id)
  );`);

	for (let statement of SQL) {
		console.log(chalk.green.bold(statement));
	}
}
