const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const sessionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, default: null },
  refresh_token: { type: String, default: null },
});

const User = mongoose.model("User", userSchema);
const Session = mongoose.model("Session", sessionSchema);
module.exports = { User, Session };
