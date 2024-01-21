const express = require("express");
const { authRouter } = require("./auth.router");
const ErrorHandler = require("../error/ErrorHandler");
const { projectRouter } = require("./project.router");
const { questRouter } = require("./quest.router");
const { teamRouter } = require("./team.router");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/projects", projectRouter);
indexRouter.use("/quests", questRouter);
indexRouter.use("/teams", teamRouter);
indexRouter.use(ErrorHandler);

module.exports.indexRouter = indexRouter;
