const mongoose = require("mongoose");

const codeNonCorrectSchema = mongoose.Schema({
  libelle: { type: String, required: true },
});

module.exports = mongoose.model("CodeNonCorrect", codeNonCorrectSchema);
