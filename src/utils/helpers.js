const fs = require('fs/promises');
const path = require('path');

const talkerJson = path.resolve(__dirname, '..', 'talker.json');
const BAD_REQUEST = 400;

const getTalkersJson = async () => {
  const response = await fs.readFile(talkerJson);
  return JSON.parse(response);
};

async function getTalkersId(talkersId) {
  const response = await getTalkersJson();
  const talkerId = response.filter(({ id }) => id === talkersId);
  return talkerId;
}

function tknGenerator() {
  const tkn = Math.random().toString().substring(2, 10) + Math.random().toString().substring(2, 10);
  return tkn;
}

const emailValidation = (req, res, next) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const { email } = req.body;
  if (!email) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  const validEmail = emailRegex.test(email);
  if (!validEmail) {
    return res.status(BAD_REQUEST).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(BAD_REQUEST).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = {
  getTalkersJson,
  getTalkersId,
  tknGenerator,
  emailValidation,
  passwordValidation,
};
