module.exports = (err, req, res, next) => {
  console.log(err);

  if (err.status < 1000) {
    res.status(err.status).json({ status: err.status, message: err.message });
  } else if (err.code == 11000) {
    res
      .status(400)
      .json({ status: 400, message: "Girilen bilgiler zaten kayıtlı" });
  } else if (err.name == "CastError") {
    res.status(400).json({ status: 400, message: "Geçersiz id" });
  } else {
    res
      .status(500)
      .json({ status: 500, message: "Beklenmedik bir hata oluştu" });
  }
};
