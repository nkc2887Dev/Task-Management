const validate = (validator) => {
  return async function (req, res, next) {
    try {
      req.body = await validator.validateAsync(req.body);
      next();
    } catch (error) {
      next(error);
      // res.status(422).json({
      //   code: "ERROR",
      //   message: error.message ? error.message : error,
      // })
    }
  };
};

module.exports = validate;
