const express = require('express');
const router = express.Router();
const userUrlController = require('../controllers/userUrl.controller');

// POST /user_url - Generate user URL with activityID and Inven!RAstdID
router.post('/', userUrlController.generateUserUrl);

module.exports = router;

