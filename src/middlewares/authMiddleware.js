const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../error/CustomError");
const { User } = require("../models/Auth.model");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    return next(
      new CustomError("Bu işlemi yapmak için giriş yapmalısınız", 401)
    );
  }

  const user = await User.findById(req.session.user._id);

  if (!user) {
    return next(
      new CustomError("Bu işlemi yapmak için giriş yapmalısınız", 401)
    );
  }

  req.user = user;

  next();
});

module.exports = authMiddleware;
