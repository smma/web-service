// Mock database with sample data

// Activities data
const activities = {
  '12345': {
    activityID: '12345',
    jsonParams: [
      {
        name: 'sessionFrequency',
        type: 'text/plain'
      },
      {
        name: 'sessionDuration',
        type: 'text/plain'
      },
      {
        name: 'sessionStartTime',
        type: 'text/plain'
      },
      {
        name: 'sessionEndTime',
        type: 'text/plain'
      },
      {
        name: 'goals',
        type: 'text/plain'
      }
    ],
    analytics: [
      {
        inveniraStdID: '1001',
        qualAnalytics: [
          {
            name: 'mentorFeedback',
            type: 'text/plain',
            value: 'Parabéns, estás no bom caminho!'
          },
          {
            name: 'menteeFeedback',
            type: 'text/plain',
            value: 'Obrigado pela ajuda!'
          }
        ],
        quantAnalytics: [
          {
            name: 'totalSessions',
            type: 'integer',
            value: 10
          },
          {
            name: 'totalAttendance',
            type: 'integer',
            value: 8
          },
          {
            name: 'totalGoals',
            type: 'integer',
            value: 5
          },
          {
            name: 'totalGoalsAchieved',
            type: 'integer',
            value: 3
          }
        ]
      }
    ]
  }
};

// Analytics list structure
const analyticsList = {
  qualAnalytics: [
    {
      name: 'mentorFeedback',
      type: 'text/plain'
    },
    {
      name: 'menteeFeedback',
      type: 'text/plain'
    }
  ],
  quantAnalytics: [
    {
      name: 'totalSessions',
      type: 'integer'
    },
    {
      name: 'totalAttendance',
      type: 'integer'
    },
    {
      name: 'totalGoals',
      type: 'integer'
    },
    {
      name: 'totalGoalsAchieved',
      type: 'integer'
    }
  ]
};

// Database methods
const db = {
  // Get activity by ID
  getActivityById: (activityID) => {
    return activities[activityID] || null;
  },

  // Get json params for an activity
  getJsonParams: (activityID) => {
    const activity = activities[activityID];
    return activity ? activity.jsonParams : null;
  },

  // Get analytics for an activity
  getAnalytics: (activityID) => {
    const activity = activities[activityID];
    return activity ? activity.analytics : null;
  },

  // Get analytics list structure
  getAnalyticsList: () => {
    return analyticsList;
  },

  // Create or update activity
  saveActivity: (activityID, data) => {
    if (!activities[activityID]) {
      activities[activityID] = {
        activityID: activityID,
        jsonParams: [],
        analytics: []
      };
    }
    if (data.jsonParams) {
      activities[activityID].jsonParams = data.jsonParams;
    }
    if (data.analytics) {
      activities[activityID].analytics = data.analytics;
    }
    return activities[activityID];
  }
};

module.exports = db;

