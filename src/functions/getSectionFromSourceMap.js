const getSectionFromSourceMap = ({ sourcePath, components }) => {
  let objTemplate = Object.entries(components).reduce((acc, [key, val]) => {
    const valTemplate = val.template ? val.template : val;

    acc[valTemplate] = [...(acc[valTemplate] || []), key];

    return acc;
  }, {});

  return {
    path: sourcePath,
    content: objTemplate,
  };
};

module.exports = getSectionFromSourceMap;
