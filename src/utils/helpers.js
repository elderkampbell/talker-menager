const fs = require('fs/promises');
const path = require('path');

const talkerJson = path.resolve(__dirname, '..', 'talker.json');

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

module.exports = {
  getTalkersJson,
  getTalkersId,
  tknGenerator,
 };
