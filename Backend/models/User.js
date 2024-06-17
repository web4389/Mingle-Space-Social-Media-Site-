const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  profilePicture: {
    type: String,
    require: true,
  },
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  description: { type: String, require: true },
});

module.exports = mongoose.model("user", UserSchema);
