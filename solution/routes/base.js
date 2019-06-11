const express = require('express');

const baseController = require('../controllers/base');

const router = express.Router();

router.get('/', baseController.getRoot);

router.get('/contact-us', baseController.getContact);

router.post('/contact-us', baseController.postContact);

module.exports = router;