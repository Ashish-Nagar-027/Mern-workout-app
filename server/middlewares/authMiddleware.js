const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token is required" });
  }

  if (!authorization.startsWith("Bearer")) {
    res
      .status(401)
      .json({ error: "Authorization token with bearer is required" });
  }

  try {
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id: decode._id }).select("_id");

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = authMiddleware;
