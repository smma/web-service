const express = require('express');
const router = express.Router();
const jsonParamsController = require('../controllers/jsonParams.controller');

// POST /analytics-atividade - Get analytics data by activityID
router.post('/', jsonParamsController.getAnalytics);

module.exports = router;

