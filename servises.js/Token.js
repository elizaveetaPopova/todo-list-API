const jwt = require("jsonwebtoken");

const generateAccessToken = async (user_id, email) => {
  return await jwt.sign({ user_id, email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};
const generateRefreshToken = async (user_id, email) => {
  return await jwt.sign({ user_id, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
