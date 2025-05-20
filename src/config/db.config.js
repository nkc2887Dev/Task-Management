const mongoose = require('mongoose');
const { MONGO } = require('./processEnv.config');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO.URL);
    console.info('mongo connnect successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = {
  connectDB,
  mongoose,
};
