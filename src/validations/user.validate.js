const joi = require('joi');

const createUserValidate = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().required(),
  })
  .unknown(false);

const loginUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = {
  createUserValidate,
  loginUser,
};
