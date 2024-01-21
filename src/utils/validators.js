const emailValidator = (email) => {
  if (
    !!email.trim() &&
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return false;
  }

  return true;
};

const passwordValidator = (password) => {
  if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
    return false;
  }

  return true;
};

module.exports = {
  emailValidator,
  passwordValidator,
};
