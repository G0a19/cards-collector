const errorHttp = function (res, message, errorNunber) {
  return res.status(errorNunber).json({ error: message });
};

module.exports = errorHttp;
