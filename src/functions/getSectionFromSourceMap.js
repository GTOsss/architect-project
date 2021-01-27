const parseAssets = require('./parseAssets');

const assets = parseAssets();

const getSectionFromSourceMap = ({ sourcePath, components }) => {
  let objTemplate = Object.entries(components).reduce((acc, [key, val]) => {
    const valTemplate = val.template ? val.template : val;

    acc[valTemplate] = [...(acc[valTemplate] || []), key];

    return acc;
  }, {});

  let assetsArr = Object.values(components).reduce((acc, val) => {
    if (val.assets) {
      assets.forEach((el) => {
        if (val.assets === el.templateName) {
          for (let i = 0; i < el.files.length; i++) {
            acc.push({
              path: el.files[i],
              content: el.content[i],
            });
          }
        }
      });
    }

    return acc;
  }, []);

  return {
    path: sourcePath,
    content: objTemplate,
    assets: assetsArr,
  };
};

module.exports = getSectionFromSourceMap;
