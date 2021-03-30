const getSectionFromSourceMap = ({ sourcePath, components, aliases }) => {
  let objTemplate = Object.entries(components).reduce((acc, [key, val]) => {
    let valTemplate = val.template ? val.template : val;
    valTemplate = aliases[valTemplate] || valTemplate;

    acc[valTemplate] = [...(acc[valTemplate] || []), key];

    return acc;
  }, {});

  return {
    path: sourcePath,
    content: objTemplate,
  };
};

module.exports = getSectionFromSourceMap;
