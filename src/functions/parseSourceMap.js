const fs = require('file-system');
const appRoot = process.cwd();
const config = require(`${appRoot}/settings/config.js`);

const sourceMapTxtPath = config.sourcesMapTxtPath;
const content = fs.readFileSync(sourceMapTxtPath, 'utf8');

const reInsides = new RegExp('(?<={)(\\n|.+)+?(?=})', 'gmi');
const reComponent = new RegExp('(?<=]).+(?=,)', 'gmi');
const reTemplate = new RegExp('(?<=\\[).+(?=])', 'gmi');

const insidesBrackets = content.match(reInsides);

const aliases = insidesBrackets[0].slice(1, -1);
const map = insidesBrackets[1].slice(1, -1);

const blocks = map.split('\n\n');
const aliasesLines = aliases.split('\n');

const resultConfig = {};
const aliasesObject = {};

blocks.forEach((block) => {
  const blockLines = block.split('\n');
  const srcPath = blockLines[0];
  const templateLines = blockLines.splice(1);

  templateLines.forEach((line) => {
    const template = line.match(reTemplate)[0];

    const component = line.match(reComponent)[0].split(',');
    const templateParams = {};

    component.forEach((el, i) => {
      if (i === 0) {
        templateParams['template'] = template;
      } else {
        const [key, value] = el.split(':');
        const trimKey = key.trim();

        templateParams[trimKey] = value.replace(/'/gim, '').trim();
      }
    });
    resultConfig[srcPath] = templateParams;
  });
});

aliasesLines.forEach((line) => {
  const aliasesMin = line.split(':')[0].trim();

  aliasesObject[aliasesMin] = line.split(':')[1].replace(" '", '').replace("',", '');
});

module.exports = {
  aliases: aliasesObject,
  map: resultConfig,
};
