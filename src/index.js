const express = require('express');

const {
  getTalkersJson,
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
} = require('./utils/helpers');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const HTTP_NOT_FOUND_STATUS = 404;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const response = await getTalkersJson();
  return res.status(200).json(response);
});

app.get('/talker/:id', async (req, res) => {
  const response = await getTalkersJson();
  const talkerId = req.params.id;
  const talker = response.find(({ id }) => id === Number(talkerId));
  if (!talker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada'
    });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/talker', tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const allTalkers = await getTalkersJson();
    const id = allTalkers.length + 1;
    const { name, age, talk } = req.body;
    const newTalker = {
      id,
      name,
      age,
      talk,
    };
    allTalkers.push(newTalker);
    await postTalkersJson(allTalkers);
    return res.status(CREATED).send(newTalker);
  });

app.put('/talker/:id', tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
  async (req, res) => {
    const allTalkers = await getTalkersJson();
    const { id } = req.params;
    const idNumber = Number(id);
    const { name, age, talk } = req.body;

    const filteredTalkers = allTalkers.filter((talkers) => talkers.id !== id);
    const newTalker = {
      id: idNumber,
      name,
      age,
      talk,
    };
    filteredTalkers.push(newTalker);
    await postTalkersJson(filteredTalkers);
    return res.status(HTTP_OK_STATUS).send(newTalker);
  });

app.delete('/talker/:id', tokenValidation,
  async (req, res) => {
    const allTalkers = await getTalkersJson();
    const { id } = req.params;
    const idNumber = Number(id);
    const filteredTalkers = allTalkers.filter((talkers) => talkers.id !== idNumber);

    await postTalkersJson(filteredTalkers);
    return res.status(NO_CONTENT).send();
  });

app.post('/login', emailValidation, passwordValidation, async (req, res) => res
  .status(HTTP_OK_STATUS).json({ token: tknGenerator() }));

app.listen(PORT, () => {
  console.log('Online');
});
