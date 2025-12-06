const fs = require('fs');
const path = require('path');
const ResponseFactory = require('../factories/ResponseFactory');

// Get activity config with dynamic domain
exports.getActivityConfig = (req, res) => {
  try {
    const filePath = path.join(__dirname, '../json/activity_config.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Get domain from environment variable or use request host
    const domain = process.env.DOMAIN || req.get('host') || 'localhost:3000';
    // Use https if X-Forwarded-Proto header is set (common in deployment platforms)
    const protocol = req.get('x-forwarded-proto') || req.protocol || 'http';
    
    // Replace <domínio> placeholder with actual domain
    const config = {
      name: jsonData.name,
      config_url: jsonData.config_url.replace('<domínio>', domain).replace('http://', `${protocol}://`),
      json_params_url: jsonData.json_params_url.replace('<domínio>', domain).replace('http://', `${protocol}://`),
      user_url: jsonData.user_url.replace('<domínio>', domain).replace('http://', `${protocol}://`),
      analytics_url: jsonData.analytics_url.replace('<domínio>', domain).replace('http://', `${protocol}://`),
      analytics_list_url: jsonData.analytics_list_url.replace('<domínio>', domain).replace('http://', `${protocol}://`)
    };
    
    return ResponseFactory.success(res, config);
  } catch (error) {
    return ResponseFactory.serverError(res, error);
  }
};

