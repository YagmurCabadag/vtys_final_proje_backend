const expressAsyncHandler = require("express-async-handler");
const {
  createProjectService,
  getProjectsService,
  getProjectService,
  deleteProjectService,
} = require("../services/Project.service");

class ProjectController {
  static createProject = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    const { team } = req.user;

    const response = await createProjectService({ ...data, team });

    res.json(response);
  });

  static getProjects = expressAsyncHandler(async (req, res) => {
    const response = await getProjectsService();

    res.json(response);
  });

  static getProject = expressAsyncHandler(async (req, res) => {
    const response = await getProjectService(req.params.id);

    res.json(response);
  });

  static deleteProject = expressAsyncHandler(async (req, res) => {
    const response = await deleteProjectService(req.params.id);

    res.json(response);
  });
}

module.exports = ProjectController;
