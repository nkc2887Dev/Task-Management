const jwt = require('jsonwebtoken');
const { JWT } = require('../config/processEnv.config');

async function generateToken(userId, email, secret = JWT.SECRET) {
  return jwt.sign({ id: userId, email }, secret, { expiresIn: JWT.EXPIRES_IN * 60 });
}

module.exports = {
  generateToken,
};
