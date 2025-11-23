const express = require('express');
const router = express.Router();
const activityConfigController = require('../controllers/activityConfig.controller');

// GET /activity-config - Get activity configuration with dynamic domain
router.get('/', activityConfigController.getActivityConfig);

module.exports = router;

