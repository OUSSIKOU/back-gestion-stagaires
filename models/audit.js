const mongoose = require("mongoose");

const auditSchema = mongoose.Schema({
  libelle: { type: String, required: true },
});

module.exports = mongoose.model("Audit", auditSchema);
