const expressAsyncHandler = require("express-async-handler");
const {
  createTeamService,
  getUserTeamService,
  getTeamByIdService,
  addMemberService,
  removeMemberService,
  updateTeamMemberService,
  getTeamMembersService,
  getTeamMemberService,
  getTeamProjectsService,
} = require("../services/Team.service");

class TeamController {
  static createTeam = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    const { _id } = req.user;

    const response = await createTeamService({ ...data, teamLeader: _id });

    res.json(response);
  });

  static getTeam = expressAsyncHandler(async (req, res) => {
    const { team } = req.user;

    const response = await getUserTeamService(team);

    res.json(response);
  });

  static getTeamById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await getTeamByIdService(id);

    res.json(response);
  });

  static addMember = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { team } = req.user;

    const response = await addMemberService(id, team);

    res.json(response);
  });

  static removeMember = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { team } = req.user;

    const response = await removeMemberService(id, team);

    res.json(response);
  });

  static updateTeamMember = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { team } = req.user;
    const data = req.body;

    const response = await updateTeamMemberService(id, team, data);

    res.json(response);
  });

  static getTeamMembers = expressAsyncHandler(async (req, res) => {
    const { team } = req.user;

    const response = await getTeamMembersService(team);

    res.json(response);
  });

  static getTeamMember = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const response = await getTeamMemberService(id);

    res.json(response);
  });

  static getTeamProjects = expressAsyncHandler(async (req, res) => {
    const { team } = req.user;

    const response = await getTeamProjectsService(team);

    res.json(response);
  });
}

module.exports = TeamController;
