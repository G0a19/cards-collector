const jwt = require("jsonwebtoken");

const errorHttp = require("./../models/errorHttp");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      return errorHttp(res, "Authentication failed!", 403);
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return errorHttp(res, "Authentication failed!", 403);
  }
};
