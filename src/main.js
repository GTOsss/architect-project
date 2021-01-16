const { getObjectWithPaths, matchFunctions } = require('./functions');

const templatesPath = 'C:/Users/mail/Desktop/timoha/arhitect/architect/settings/templates';

const objectWithPaths = getObjectWithPaths(templatesPath);
 //console.log(objectWithPaths);

const matchedFunctions = matchFunctions(objectWithPaths);
//console.log(matchedFunctions);
// Второй таск
