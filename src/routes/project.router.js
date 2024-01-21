const express = require("express");
const ProjectController = require("../controllers/Project.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const projectRouter = express.Router();

projectRouter
  .route("/create-project")
  .all(authMiddleware)
  .post(ProjectController.createProject);
projectRouter
  .route("/get-projects")
  .all(authMiddleware)
  .get(ProjectController.getProjects);
projectRouter
  .route("/get-project/:id")
  .all(authMiddleware)
  .get(ProjectController.getProject);
projectRouter
  .route("/delete-project/:id")
  .all(authMiddleware)
  .delete(ProjectController.deleteProject);

module.exports.projectRouter = projectRouter;
