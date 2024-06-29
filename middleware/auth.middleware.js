const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate the user
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).send("Access denied.");
  }
};

// Middleware to authorize admin
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
