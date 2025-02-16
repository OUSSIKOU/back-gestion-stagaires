const mongoose = require("mongoose");

const codeCorrectSchema = mongoose.Schema({
  libelle: { type: String, required: true },
});

module.exports = mongoose.model("CodeCorrect", codeCorrectSchema);
