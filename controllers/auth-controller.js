const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/auth");
const { validationResult } = require("express-validator");

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

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({ token });
  } catch (error) {
    handleError(res, error);
  }
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Registration error", errors });
    }
    const { first_name, last_name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  login,
  register,
};
