const CustomError = require("../error/CustomError");
const { Project } = require("../models/Project.model");
const { Team } = require("../models/Team.model");
const { User } = require("../models/Auth.model");
const { Quest } = require("../models/Quest.model");

const createProjectService = async (data) => {
  if (!data.name) throw new CustomError("Proje adı boş olamaz", 400);
  if (!data.description)
    throw new CustomError("Proje açıklaması boş olamaz", 400);
  if (!data.endDate)
    throw new CustomError("Proje bitiş tarihi boş olamaz", 400);

  const checkProject = await Project.findOne({ name: data.name });

  if (checkProject) throw new CustomError("Bu isimde bir proje zaten var", 400);

  if (!data.team) throw new CustomError("Takım idsi boş olamaz", 400);

  const team = await Team.findById(data.team);

  if (!team) throw new CustomError("Böyle bir takım yok", 400);

  const project = await Project.create(data);

  await project.save();

  await team.projects.push(project);

  await team.save();

  return {
    success: true,
    data: project,
    message: "Proje başarıyla oluşturuldu",
    status: 201,
  };
};

const getProjectsService = async () => {
  const projects = await Project.find();

  return {
    success: true,
    data: projects,
    message: "Projeler başarıyla getirildi",
    status: 200,
  };
};

const getProjectService = async (id) => {
  const project = await Project.findById(id);

  return {
    success: true,
    data: project,
    message: "Proje başarıyla getirildi",
    status: 200,
  };
};

const deleteProjectService = async (id) => {
  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return {
        success: false,
        message: "Proje bulunamadı",
        status: 404,
      };
    }

    const quest = await Quest.deleteMany({ project: id });

    const team = await Team.findById(project.team);

    const user = await User.findById(team.teamLeader);

    team.projects.pull(project);
    user.projects.pull(project);

    await team.save();
    await user.save();

    return {
      success: true,
      data: project,
      message: "Proje başarıyla silindi",
      status: 200,
    };
  } catch (error) {
    console.error("Error in deleteProjectService:", error);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
};

module.exports = deleteProjectService;

module.exports = {
  createProjectService,
  getProjectsService,
  getProjectService,
  deleteProjectService,
};
