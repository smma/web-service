// Display user page with parameters
exports.displayUserPage = (req, res) => {
  try {
    const { activityID, 'Inven!RAstdID': invenRAstdID } = req.query;

    // Prepare parameters object
    const parameters = {
      activityID: activityID || null,
      'Inven!RAstdID': invenRAstdID || null
    };

    // Create HTML page with JSON display
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Activity</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            padding: 40px;
            max-width: 800px;
            width: 100%;
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
            font-size: 28px;
        }

        .json-container {
            background: #f5f5f5;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            padding: 20px;
            overflow-x: auto;
        }

        pre {
            margin: 0;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>User Activity Parameters</h1>
        <div class="json-container">
            <pre id="json-display">${JSON.stringify(parameters, null, 2)}</pre>
        </div>
    </div>
</body>
</html>`;

    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

