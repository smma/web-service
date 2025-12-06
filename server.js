const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const ResponseFactory = require('./factories/ResponseFactory');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (must be before static files to avoid conflicts)
const routes = require('./routes');
app.use('/', routes);

// Serve static files (HTML, CSS, JS) - after routes to avoid conflicts
app.use(express.static('public'));

// 404 handler
app.use((req, res) => {
  ResponseFactory.notFound(res, 'Route');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  ResponseFactory.serverError(res, err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

