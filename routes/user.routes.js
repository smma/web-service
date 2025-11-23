const express = require('express');
const path = require('path');
const router = express.Router();

// GET /user - Serve user HTML page with query parameters
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user.html'));
});

module.exports = router;
