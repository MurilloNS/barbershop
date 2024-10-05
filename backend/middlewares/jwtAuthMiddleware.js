const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      status: 401,
      error: "Unauthorized",
      message: "Token não fornecido!",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Token inválido!",
    });
  }
};
