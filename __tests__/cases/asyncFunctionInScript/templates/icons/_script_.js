const returnText = () => {
  return 'test ';
};

const asyncFunction = async () => {
  return await new Promise((resolve) => {
    setTimeout(resolve, 1000, returnText());
  });
};

module.exports = { asyncFunction };
