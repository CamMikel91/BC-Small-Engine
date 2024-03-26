const jwt = require("jsonwebtoken");
const config = require("config");

// Authorization middleware for admin users

function adminAuth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    if (!decoded.isAdmin)
      return res.status(403).send("Access denied. Not an admin.");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = adminAuth;
