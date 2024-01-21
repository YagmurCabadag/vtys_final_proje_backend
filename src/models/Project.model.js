const mongoose = require("mongoose");
const { ProjectStatusEnum } = require("../enums/project.enum");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: Object.values(ProjectStatusEnum),
      default: ProjectStatusEnum.TO_BE_CONDUCTED,
    },
    endDate: {
      type: Date,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    quests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quest",
      },
    ],
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports.Project = mongoose.model("Project", ProjectSchema);
