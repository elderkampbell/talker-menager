const fs = require('fs/promises');
const path = require('path');

const talkerJson = path.resolve(__dirname, '..', 'talker.json');
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;

const getTalkersJson = async () => {
  const response = await fs.readFile(talkerJson);
  return JSON.parse(response);
};

const postTalkersJson = async (data) => {
  await fs.writeFile(talkerJson, JSON.stringify(data, null, 2));
  return true;
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

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).send({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length < 16) {
    return res.status(UNAUTHORIZED).send({
      message: 'Token inválido',
  });
}
  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).send({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(BAD_REQUEST).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
  });
}
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(BAD_REQUEST).send({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(BAD_REQUEST).send({
      message: 'A pessoa palestrante deve ser maior de idade',
  });
}
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(BAD_REQUEST).send({
      message: 'O campo "talk" é obrigatório',
    });
}
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return res.status(BAD_REQUEST).send({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  const dateValidation = dateRegex.test(watchedAt);
 if (!dateValidation) {
    return res.status(BAD_REQUEST).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  });
}
  next();
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate) {
    return res.status(BAD_REQUEST).send({
      message: 'O campo "rate" é obrigatório',
    });
  }
  const rateValue = Number(rate);
  const rateInteger = Number.isInteger(rateValue);
  
  if (!rateInteger || rateValue < 1 || rateValue > 5) {
    return res.status(BAD_REQUEST).send({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
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
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  postTalkersJson,
};