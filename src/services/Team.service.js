const CustomError = require("../error/CustomError");
const { User } = require("../models/Auth.model");
const { Team } = require("../models/Team.model");
const { Project } = require("../models/Project.model");

const createTeamService = async (data) => {
  if (!data.name) throw new CustomError("Takım adı boş olamaz", 400);

  if (!data.description)
    throw new CustomError("Takım açıklaması boş olamaz", 400);

  const team = await Team.create(data);
  const user = await User.findById(data.teamLeader);

  user.team = team._id;

  await user.save();
  await team.save();

  return {
    success: true,
    data: team,
    message: "Takım başarıyla oluşturuldu",
    status: 201,
  };
};

const getUserTeamService = async (team) => {
  if (!team) throw new CustomError("Takım idsi boş olamaz", 400);
  const getTeam = await Team.findById(team);

  return {
    success: true,
    data: getTeam,
    message: "Takım başarıyla getirildi",
    status: 200,
  };
};

const getTeamByIdService = async (id) => {
  if (!id) throw new CustomError("Takım idsi boş olamaz", 400);
  const team = await Team.findById(id);

  return {
    success: true,
    data: team,
    message: "Takım başarıyla getirildi",
    status: 200,
  };
};

const addMemberService = async (userId, teamId) => {
  const user = await User.findById(userId);

  const team = await Team.findById(teamId);

  if (!user) {
    throw new CustomError("Belirtilen kullanıcı bulunamadı", 404);
  }

  if (!team) {
    throw new CustomError("Belirtilen takım bulunamadı", 404);
  }

  if (user.team) {
    throw new CustomError("Kullanıcı zaten bir takıma aittir", 400);
  }

  team.members.push(user._id);
  user.team = team._id;

  await team.save();
  await user.save();

  return {
    success: true,
    data: team,
    message: "Üye başarıyla takıma eklendi",
    status: 200,
  };
};

const removeMemberService = async (userId, teamId) => {
  const user = await User.findById(userId);

  const team = await Team.findById(teamId);

  if (!user) {
    throw new CustomError("Belirtilen kullanıcı bulunamadı", 404);
  }

  if (!team) {
    throw new CustomError("Belirtilen takım bulunamadı", 404);
  }

  if (!user.team || user.team.toString() !== teamId.toString()) {
    throw new CustomError("Kullanıcı belirtilen takıma ait değil", 400);
  }

  team.members = team.members.filter(
    (memberId) => memberId.toString() !== userId
  );
  user.team = null;

  await team.save();
  await user.save();

  return {
    success: true,
    data: team,
    message: "Üye başarıyla takımdan çıkarıldı",
    status: 200,
  };
};

const updateTeamMemberService = async (userId, teamId, newData) => {
  const user = await User.findById(userId);

  const team = await Team.findById(teamId);

  if (!user) {
    throw new CustomError("Belirtilen kullanıcı bulunamadı", 404);
  }

  if (!team) {
    throw new CustomError("Belirtilen takım bulunamadı", 404);
  }

  if (typeof newData === "object" && newData !== null) {
    for (const [key, value] of Object.entries(newData)) {
      console.log("🚀 ~ updateTeamMemberService ~ newData:", user.key);
      let validKeys = ["username", "email", "password"];
      if (validKeys.includes(key)) {
        user[key] = value;
      }
    }
  } else {
    throw new CustomError("Geçersiz veri gönderildi", 400);
  }

  await user.save();

  return {
    success: true,
    data: user,
    message: "Kullanıcının takım bilgileri başarıyla güncellendi",
    status: 200,
  };
};

const getTeamMembersService = async (team) => {
  if (!team) throw new CustomError("Takım idsi boş olamaz", 400);
  const teamInfo = await Team.findById(team);

  let users = [];

  for (const member of teamInfo.members) {
    let user = await User.findById({ _id: member });
    users.push(user);
  }

  return {
    success: true,
    data: users,
    message: "Takım üyeleri başarıyla getirildi",
    status: 200,
  };
};

const getTeamMemberService = async (id) => {
  if (!id) throw new CustomError("Kullanıcı idsi boş olamaz", 400);
  const user = await User.findById({ _id: id });

  if (!user) {
    throw new CustomError("Bu id'ye ait bir kullanıcı bulunamadı", 400);
  }

  return {
    success: true,
    data: user,
    message: "Takım üyesi başarıyla getirildi",
    status: 200,
  };
};

const getTeamProjectsService = async (team) => {
  if (!team) throw new CustomError("Takım idsi boş olamaz", 400);
  const teamInfo = await Team.findById(team);

  let projects = [];
  for (const project of teamInfo.projects) {
    let projectInfo = await Project.findById({ _id: project });
    projects.push(projectInfo);
  }

  return {
    success: true,
    data: projects,
    message: "Takım projeleri başarıyla getirildi",
    status: 200,
  };
};

module.exports = {
  createTeamService,
  getUserTeamService,
  getTeamByIdService,
  addMemberService,
  removeMemberService,
  updateTeamMemberService,
  getTeamMembersService,
  getTeamMemberService,
  getTeamProjectsService,
};
