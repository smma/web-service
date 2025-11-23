const express = require('express');
const router = express.Router();
const jsonParamsController = require('../controllers/jsonParams.controller');

// GET /lista-analytics-atividade - Get analytics list
router.get('/', jsonParamsController.getAnalyticsList);

module.exports = router;

