const expressAsyncHandler = require("express-async-handler");
const {
  loginService,
  registerService,
  getMeService,
  getAllUsersService,
} = require("../services/Auth.service");
const CustomError = require("../error/CustomError");

class AuthController {
  static login = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await loginService(email, password);

    req.session.regenerate(function (err) {
      if (err) throw err;

      const data = response.data;
      data.password = undefined;

      req.session.user = data;
      req.session.save(function (err) {
        if (err) throw err;

        console.log(req.session);

        res.json(response);
      });
    });
  });

  static register = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    const response = await registerService(data);

    res.json(response);
  });

  static logout = expressAsyncHandler(async (req, res) => {
    if (!req.session.user) throw new CustomError("Kullanıcı bulunamadı", 400);

    req.session.destroy(function (err) {
      if (err) throw err;

      res.json({
        success: true,
        message: "Çıkış başarılı",
        status: 200,
      });
    });
  });

  static getMe = expressAsyncHandler(async (req, res) => {
    const user = req.session.user;

    const response = await getMeService(user);

    res.json(response);
  });

  static getAllUsers = expressAsyncHandler(async (req, res) => {
    const response = await getAllUsersService();

    res.json(response);
  });
}

module.exports = AuthController;
