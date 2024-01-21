const CustomError = require("../error/CustomError");
const { User } = require("../models/Auth.model");
const { comparePassword } = require("../utils/passwordUtils");
const { passwordValidator, emailValidator } = require("../utils/validators");

const loginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new CustomError("Kullanıcı bulunamadı", 400);

  if (!!(await comparePassword(password, user.password)))
    throw new CustomError("Şifre hatalı", 400);

  return {
    success: true,
    data: user,
    message: "Giriş başarılı",
    status: 200,
  };
};

const registerService = async (data) => {
  if (!emailValidator(data.email))
    throw new CustomError("Email formatı hatalı", 400);

  if (!passwordValidator(data.password))
    throw new CustomError(
      "Şifre formatı hatalı (En az 8 karakter, büyük harf, küçük harf ve rakam içermeli)",
      400
    );

  const user_control = await User.findOne({ email: data.email });

  if (user_control)
    throw new CustomError("Bu email adresi ile daha önce kayıt olunmuş", 400);

  const user = await User.create(data);

  await user.save();

  return {
    success: true,
    data: user,
    message: "Kayıt başarılı",
    status: 201,
  };
};

const getMeService = async (user) => {
  if (!user) throw new CustomError("Kullanıcı bulunamadı", 400);

  const checkedUser = await User.findOne({ email: user.email });

  if (!user) throw new CustomError("Kullanıcı bulunamadı", 400);

  return {
    success: true,
    data: checkedUser,
    message: "Kullanıcı bilgileri",
    status: 200,
  };
};

const getAllUsersService = async () => {
  // Takımı olmayan kullanıcılar

  const users = await User.find({ team: null });

  return {
    success: true,
    data: users,
    message: "Kullanıcılar listelendi",
    status: 200,
  };
};

module.exports = {
  loginService,
  registerService,
  getMeService,
  getAllUsersService,
};
