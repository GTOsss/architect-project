const { createEvent } = require('./rootDomain');

const endGeneration = createEvent();

module.exports = { endGeneration };
