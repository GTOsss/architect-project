const smartRequire = (path, fallback = undefined) => {
  try {
    return require(path);
  } catch (err) {
    return fallback;
  }
};

module.exports = smartRequire;
