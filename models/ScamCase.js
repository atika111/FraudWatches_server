const mongoose = require("mongoose");

const scamCaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scamTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScamType",
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  position: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  comments: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isThereRating: {
    confirmed: {
      type: Number,
      default: 0,
    },
    all: {
      type: Number,
      default: 0,
    },
  },
  emergencyNumbers: {
    ambulance: {
      type: String,
    },
    fire: {
      type: String,
    },
    police: {
      type: String,
    },
    dispatch: {
      type: String,
    },
  },
});

const ScamCase = mongoose.model("ScamCase", scamCaseSchema);

module.exports = ScamCase;
