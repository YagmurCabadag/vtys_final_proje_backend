const express = require("express");
const TeamController = require("../controllers/Team.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const teamRouter = express.Router();

teamRouter
  .route("/create-team")
  .all(authMiddleware)
  .post(TeamController.createTeam);
teamRouter
  .route("/get-user-team")
  .all(authMiddleware)
  .get(TeamController.getTeam);
teamRouter
  .route("/get-team/:id")
  .all(authMiddleware)
  .get(TeamController.getTeamById);
teamRouter
  .route("/add-member/:id")
  .all(authMiddleware)
  .put(TeamController.addMember);
teamRouter
  .route("/remove-member/:id")
  .all(authMiddleware)
  .put(TeamController.removeMember);
teamRouter
  .route("/update-team-member/:id")
  .all(authMiddleware)
  .put(TeamController.updateTeamMember);
teamRouter
  .route("/get-team-members")
  .all(authMiddleware)
  .get(TeamController.getTeamMembers);
teamRouter
  .route("/get-team-member/:id")
  .all(authMiddleware)
  .get(TeamController.getTeamMember);
teamRouter
  .route("/get-team-projects")
  .all(authMiddleware)
  .get(TeamController.getTeamProjects);

module.exports.teamRouter = teamRouter;
