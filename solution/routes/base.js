const express = require('express');

const baseController = require('../controllers/base');

const router = express.Router();

router.get('/', baseController.getRoot);

router.get('/contact-us', baseController.getContact);

router.post('/contact-us', baseController.postContact);

router.get('/data', baseController.getData);

router.post('/data', baseController.postData);

module.exports = router;