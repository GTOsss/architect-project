const createFileByTemplates = ({ targetPath, params, template }) => {
  Object.entries(params).forEach(([key, value]) => {
    console.log(template);
    // console.log(variable);
  });

  // console.log(targetPath, params, template);
};

module.exports = createFileByTemplates;
