// Generate user URL with activityID and Inven!RAstdID
exports.generateUserUrl = (req, res) => {
  try {
    const { activityID, 'Inven!RAstdID': invenRAstdID, json_params } = req.body;

    // Validate required fields
    if (!activityID) {
      return res.status(400).json({
        success: false,
        error: 'activityID is required'
      });
    }

    if (!invenRAstdID) {
      return res.status(400).json({
        success: false,
        error: 'Inven!RAstdID is required'
      });
    }

    if (!json_params || !Array.isArray(json_params)) {
      return res.status(400).json({
        success: false,
        error: 'json_params is required and must be an array'
      });
    }

    // Construct URL with activityID and Inven!RAstdID
    // Using query parameters format
    const domain = process.env.DOMAIN || req.get('host') || 'localhost:3000';
    // Use https if X-Forwarded-Proto header is set (common in deployment platforms) or if domain doesn't contain localhost
    const protocol = req.get('x-forwarded-proto') || (domain.includes('localhost') ? 'http' : 'https') || req.protocol || 'http';
    const baseUrl = `${protocol}://${domain}`;
    const url = `${baseUrl}/user?activityID=${encodeURIComponent(activityID)}&Inven!RAstdID=${encodeURIComponent(invenRAstdID)}`;

    res.status(200).json({
      success: true,
      url: url,
      activityID: activityID,
      'Inven!RAstdID': invenRAstdID
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

