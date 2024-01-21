const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Takım adı zaten alınmış"],
    },
    description: {
      type: String,
      required: true,
    },
    teamLeader: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
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

module.exports.Team = mongoose.model("Team", TeamSchema);
