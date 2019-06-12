const express = require('express');
const router = express.Router();
const Recaptcha = require('express-recaptcha').RecaptchaV3;
const path = require('path');

const baseController = require('../controllers/base');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

const recaptcha = new Recaptcha(process.env.PUBLIC, process.env.PRIVATE, {callback:'cb'});

//--- Routes ---//
router.get('/', baseController.getRoot);
router.get('/data', baseController.getData);

router.get('/contact-us', recaptcha.middleware.render, (req, res) => {
	baseController.getContact(req, res);
})

router.post('/contact-us', baseController.postContact);
router.post('/data', baseController.postData);

router.post('/captcha', recaptcha.middleware.verify, (req, res) => {
	baseController.postCaptcha(req, res);
})

module.exports = router;