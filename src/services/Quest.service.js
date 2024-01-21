const CustomError = require("../error/CustomError");
const { User } = require("../models/Auth.model");
const { Project } = require("../models/Project.model");
const { Team } = require("../models/Team.model");
const { Quest } = require("../models/Quest.model");
const { QuestStatusEnum } = require("../enums/quest.enum");

const createQuestService = async (data) => {
  if (!data.title) throw new CustomError("Görev başlığı boş olamaz", 400);
  if (!data.description) {
    throw new CustomError("Görev açıklaması boş olamaz", 400);
  }

  if (!data.project) {
    throw new CustomError("Görevin bağlı olduğu proje boş olamaz", 400);
  }

  const checkProject = await Project.findById({
    _id: data.project,
  });

  if (!checkProject) {
    throw new CustomError("Bu id'ye ait bir proje bulunamadı", 400);
  }

  if (!data.assignedTo) {
    throw new CustomError("Görevin atandığı kullanıcılar boş olamaz", 400);
  }

  if (!data.endDate) {
    throw new CustomError("Görevin bitiş tarihi boş olamaz", 400);
  }

  const checkUser = await User.findById({
    _id: data.assignedTo,
  });

  if (!checkUser) {
    throw new CustomError("Bu id'ye ait bir kullanıcı bulunamadı", 400);
  }

  const quest = await Quest.create(data);
  const updateProject = await Project.findByIdAndUpdate(
    { _id: data.project },
    { $push: { quests: quest._id, assignedUsers: data.assignedTo } },
    { new: true }
  );
  const updateTeam = await Team.findByIdAndUpdate(
    { _id: data.team },
    { $push: { quests: quest._id } },
    { new: true }
  );
  const updateUser = await User.findByIdAndUpdate(
    { _id: data.assignedTo },
    { $push: { quests: quest._id, projects: data.project } },
    { new: true }
  );

  await quest.save();
  await updateProject.save();
  await updateTeam.save();
  await updateUser.save();

  return {
    success: true,
    data: quest,
    message: "Görev başarıyla oluşturuldu",
    status: 201,
  };
};

const updateQuestService = async (id, data) => {
  const quest = await Quest.findById({ _id: id });

  if (!quest) {
    throw new CustomError("Bu id'ye ait bir görev bulunamadı", 400);
  }

  if (data.title) {
    quest.title = data.title;
  }

  if (data.description) {
    quest.description = data.description;
  }

  if (data.assignedTo) {
    quest.assignedTo = data.assignedTo;
  }

  if (quest.delayAmount === 0) {
    const oldEndDate = quest.endDate || new Date();

    const endDateParts = data.endDate.split("/");
    const formattedEndDate = `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`;
    const newEndDate = new Date(formattedEndDate);

    if (isNaN(oldEndDate.getTime()) || isNaN(newEndDate.getTime())) {
      throw new CustomError("Geçersiz tarih formatı", 400);
    }

    const dayDifference = Math.floor(
      (newEndDate - oldEndDate) / (1000 * 60 * 60 * 24)
    );
    quest.delayAmount = dayDifference;
    quest.endDate = newEndDate;
  } else {
    const lastEndDate = quest.endDate || new Date();

    const endDateParts = data.endDate.split("/");
    const formattedEndDate = `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`;
    const newEndDate = new Date(formattedEndDate);

    if (isNaN(lastEndDate.getTime()) || isNaN(newEndDate.getTime())) {
      throw new CustomError("Geçersiz tarih formatı", 400);
    }

    const dayDifference = Math.floor(
      (newEndDate - lastEndDate) / (1000 * 60 * 60 * 24)
    );
    quest.delayAmount = dayDifference;
    quest.endDate = newEndDate;
  }

  if (Object.values(QuestStatusEnum).includes(data.status)) {
    quest.status = data.status;
  }

  await quest.save();

  return {
    success: true,
    data: quest,
    message: "Görev başarıyla güncellendi",
    status: 200,
  };
};

const getQuestsService = async (team) => {
  const quests = await Quest.find({ team });

  return {
    success: true,
    data: quests,
    message: "Görevler başarıyla getirildi",
    status: 200,
  };
};

const getQuestService = async (id) => {
  const quest = await Quest.findById({ _id: id });

  if (!quest) {
    throw new CustomError("Bu id'ye ait bir görev bulunamadı", 400);
  }

  return {
    success: true,
    data: quest,
    message: "Görev başarıyla getirildi",
    status: 200,
  };
};

const deleteQuestService = async (id) => {
  const quest = await Quest.findById({ _id: id });
  if (!quest) {
    throw new CustomError("Bu id'ye ait bir görev bulunamadı", 400);
  }
  const updateProject = await Project.findByIdAndUpdate(
    { _id: quest.project },
    { $pull: { quests: quest._id } },
    { new: true }
  );
  const updateTeam = await Team.findByIdAndUpdate(
    { _id: quest.team },
    { $pull: { quests: quest._id } },
    { new: true }
  );

  await updateProject.save();
  await updateTeam.save();
  await quest.remove();

  return {
    success: true,
    data: quest,
    message: "Görev başarıyla silindi",
    status: 200,
  };
};

module.exports = {
  createQuestService,
  getQuestsService,
  updateQuestService,
  getQuestService,
  deleteQuestService,
};
