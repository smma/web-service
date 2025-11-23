const express = require('express');
const router = express.Router();
const activityConfigController = require('../controllers/activityConfig.controller');

// Root route - returns activity config
router.get('/', activityConfigController.getActivityConfig);

// Import route modules
const jsonParamsRoutes = require('./jsonParams.routes');
const analyticsRoutes = require('./analytics.routes');
const analyticsAtividadeRoutes = require('./analyticsAtividade.routes');
const userUrlRoutes = require('./userUrl.routes');
const userRoutes = require('./user.routes');

// Mount routes
router.use('/json-params-atividade', jsonParamsRoutes);
router.use('/lista-analytics-atividade', analyticsRoutes);
router.use('/analytics-atividade', analyticsAtividadeRoutes);
router.use('/user_url', userUrlRoutes);
router.use('/user', userRoutes);

module.exports = router;

