const express = require('express');
const { getTalkersJson } = require('./utils/helpers');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const response = await getTalkersJson();
  return res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log('Online');
});
