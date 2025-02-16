const mongoose = require('mongoose');

const aiSchema = mongoose.Schema({
    libelle: { type: String, required: true,  },
});


module.exports = mongoose.model('Ai', aiSchema);