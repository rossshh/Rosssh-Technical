const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Access denied. No token provided." });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
    if (!isVerified) {
      throw new Error("Invalid token");
    }
    console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }, {password: 0}); 
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();

  } catch (error) {
    console.log("Middleware error:", error);
    next(error);
  }
};

module.exports = authMiddleware;