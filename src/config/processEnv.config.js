module.exports = {
  MONGO: {
    URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/multi_team_collab',
  },
  PORT: process.env.PORT || '5000',
  JWT: {
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || 10000,
    SECRET: process.env.JWT_SECRET || 'myjwtsecret',
  },
  SEED: process.env.PORT || 'true',
};
