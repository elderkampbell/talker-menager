const fs = require('fs/promises');
const path = require('path');

const talkerJson = path.resolve(__dirname, '..', 'talker.json');

const getTalkersJson = async () => {
  const response = await fs.readFile(talkerJson);
  return JSON.parse(response);
};

module.exports = {
  getTalkersJson,
 };
