const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Authorization header is malformed" });
    }

    const token = parts[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            error: "Token expired",
            expiredAt: err.expiredAt
          });
        } else {
          return res.status(401).json({ error: err.message });
        }
      }

      req.auth = {
        userId: decoded.userId,
      };
      next();
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error.message);
    res.status(401).json({ error: error.message });
  }
};
