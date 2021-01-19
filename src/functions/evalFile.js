const evalFile = (functionName, variableName) => {
  const data = `
const {${functionName}} = require("C:/Users/mail/Desktop/timoha/arhitect/architect/settings/methods");
 ${functionName}('${variableName}');`;

  return eval(data);
};

module.exports = evalFile;
