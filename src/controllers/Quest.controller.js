const expressAsyncHandler = require("express-async-handler");
const {
  createQuestService,
  getQuestsService,
  updateQuestService,
  getQuestService,
  deleteQuestService,
} = require("../services/Quest.service");

class QuestController {
  static createQuest = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    const { team } = req.user;

    const response = await createQuestService({ ...data, team });

    res.json(response);
  });

  static getQuests = expressAsyncHandler(async (req, res) => {
    const { team } = req.user;

    const response = await getQuestsService(team);

    res.json(response);
  });

  static getQuest = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await getQuestService(id);

    res.json(response);
  });

  static updateQuest = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const response = await updateQuestService(id, data);

    res.json(response);
  });

  static deleteQuest = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await deleteQuestService(id);

    res.json(response);
  });
}

module.exports = QuestController;
