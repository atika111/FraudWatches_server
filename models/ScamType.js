const mongoose = require("mongoose");

const scamTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  advice: {
    type: String,
    required: true,
  },
});

const ScamType = mongoose.model("ScamType", scamTypeSchema);

module.exports = ScamType;
