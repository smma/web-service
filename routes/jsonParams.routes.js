const express = require('express');
const router = express.Router();
const jsonParamsController = require('../controllers/jsonParams.controller');

// GET /json-params-atividade - Get JSON params
router.get('/', jsonParamsController.getJsonParams);

module.exports = router;

