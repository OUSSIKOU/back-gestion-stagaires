const mongoose = require("mongoose");

const validationSchema = mongoose.Schema({
  message: { type: String, required: true },
  to: { type: String, required: true },
});

module.exports = mongoose.model("Validation", validationSchema);
