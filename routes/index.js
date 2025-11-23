const express = require('express');
const router = express.Router();

// Import route modules
const jsonParamsRoutes = require('./jsonParams.routes');
const analyticsRoutes = require('./analytics.routes');
const analyticsAtividadeRoutes = require('./analyticsAtividade.routes');
const userUrlRoutes = require('./userUrl.routes');
const activityConfigRoutes = require('./activityConfig.routes');

// Mount routes
router.use('/json-params-atividade', jsonParamsRoutes);
router.use('/lista-analytics-atividade', analyticsRoutes);
router.use('/analytics-atividade', analyticsAtividadeRoutes);
router.use('/user_url', userUrlRoutes);
router.use('/activity-config', activityConfigRoutes);

module.exports = router;

