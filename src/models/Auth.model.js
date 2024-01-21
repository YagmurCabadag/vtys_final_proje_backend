const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "username must be unique"],
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "email must be unique"],
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "passive"],
      default: "active",
    },
    team: {
      type: mongoose.Schema.ObjectId,
      ref: "Team",
      default: null,
    },
    projects: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
      },
    ],
    quests: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Quest",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports.User = mongoose.model("Auth", AuthSchema);
