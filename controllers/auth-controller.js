const bcrypt = require("bcrypt");

const { User, Session } = require("../models/auth");
const { validationResult } = require("express-validator");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../servises.js/Token");
const { COOKIE_SETTINGS, ACCESS_TOKEN_EXPIRATION } = require("../constants");

const handleError = (res, error) => {
  res.status(500).json({ error });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `User ${email} is not exist` });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Password is not correct` });
    }

    const accessToken = await generateAccessToken(user._id, email);
    const refreshToken = await generateRefreshToken(user._id, email);
    res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
    return res.status(200).json({ accessToken });
  } catch (error) {
    handleError(res, error);
  }
};

const register = async (req, res) => {
  console.log("req.body :>> ", req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Registration error", errors });
    }
    const { firstName, lastName, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    user.save();

    const accessToken = await generateAccessToken(user._id, email);
    const refreshToken = await generateRefreshToken(user._id, email);
    const accessTokenExpiration = ACCESS_TOKEN_EXPIRATION;
    res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

    const session = new Session({
      user_id: user._id,
      refresh_token: refreshToken,
    });
    session.save();
    return res.status(200).json({ accessToken, accessTokenExpiration });
  } catch (error) {
    handleError(res, error);
  }
};

const refresh = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  login,
  register,
  refresh,
};
