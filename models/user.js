const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    // phone: { type: Array },
    role: { type: Number, default: 0 },
    imageUrl: { type: String }, // Add this line to store the image URL directly
  },
  {
    timestamps: true,
    collection: "user",
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
