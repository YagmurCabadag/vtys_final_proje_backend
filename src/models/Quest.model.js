const mongoose = require("mongoose");
const { QuestStatusEnum } = require("../enums/quest.enum");

const QuestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    status: {
      type: String,
      enum: Object.values(QuestStatusEnum),
      default: QuestStatusEnum.TO_BE_CONDUCTED,
    },
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    project: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Project",
    },
    team: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Team",
    },
    endDate: {
      type: Date,
      required: [true, "Please provide a end date"],
    },
    delayAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.Quest = mongoose.model("Quest", QuestSchema);
