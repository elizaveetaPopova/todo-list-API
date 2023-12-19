const express = require("express");
const { check } = require("express-validator");

const { login, register, refresh } = require("../controllers/auth-controller");

const router = express.Router();

router.post(
  "/register",
  [
    check("email", "Email cannot be empty").notEmpty(),
    check("password", "Password  must be more than 4 characters").isLength({
      min: 4,
    }),
  ],
  register
);

router.post("/login", login);
router.get("/refresh", refresh);

module.exports = router;
