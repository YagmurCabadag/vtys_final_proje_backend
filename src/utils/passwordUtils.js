const bcrypt = require("bcrypt");

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

module.exports = {
  comparePassword,
  hashPassword,
};
