const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const QuestController = require("../controllers/Quest.controller");

const questRouter = express.Router();

questRouter
  .route("/create-quest")
  .all(authMiddleware)
  .post(QuestController.createQuest);
questRouter
  .route("/update-quest/:id")
  .all(authMiddleware)
  .put(QuestController.updateQuest);
questRouter
  .route("/get-quests")
  .all(authMiddleware)
  .get(QuestController.getQuests);
questRouter
  .route("/get-quest/:id")
  .all(authMiddleware)
  .get(QuestController.getQuest);
questRouter
  .route("/delete-quest/:id")
  .all(authMiddleware)
  .delete(QuestController.deleteQuest);

module.exports.questRouter = questRouter;
