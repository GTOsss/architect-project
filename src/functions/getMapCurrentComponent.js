const getMapCurrentComponent = ({ sourcePath, components }) => {
  let objTemplate = Object.entries(components).reduce((acc, [key, val]) => {
    const valTemplate = val.template ? val.template : val;

    acc[valTemplate] = [...(acc[valTemplate] || []), key];

    return acc;
  }, {});

  let objSource = Object.entries(components).reduce((acc, [key, val]) => {
    if (val.sources) {
      acc[val.sources] = [...(acc[val.sources] || []), key];
    }

    return acc;
  }, {});

  return {
    path: sourcePath,
    content: objTemplate,
    sources: objSource,
  };
};

module.exports = getMapCurrentComponent;
