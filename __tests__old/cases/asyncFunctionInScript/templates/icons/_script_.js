const axios = require('axios');

const main = async (_, { writeFileStream }) => {
  const { data } = await axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream',
  });

  writeFileStream({ data, fileName: 'photo.jpeg' });
};

module.exports = {
  main,
};
