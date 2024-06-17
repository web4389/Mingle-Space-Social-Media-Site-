const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  profilePicture: {
    type: String,
    require: true,
  },
  postImage: {
    type: String,
  },
  id: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  paragraph: { type: String, require: true },
  post: { type: String, require: true },
  date: { type: Object },
});

module.exports = mongoose.model("post", PostSchema);
