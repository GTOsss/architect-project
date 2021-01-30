const { resolve } = require('path');
const fs = require('file-system');

const sourceMapTxtPath = resolve(__dirname, '../../settings/source-map.txt');

const content = fs.readFileSync(sourceMapTxtPath, 'utf8');

const reParentObjects = new RegExp('\\w.+\\s{', 'gmi');
const reAssets = new RegExp('\\$.+', 'gmi');
const reTemplate = new RegExp('\\[.+]', 'gmi');
const reComponent = new RegExp(']\\s(\\w.+,)', 'gmi');
const reDir = new RegExp('src.+', 'gmi');

const parentObjects = content.match(reParentObjects).map((el) => el.replace(' {', ''));

const assets = content.match(reAssets);
const template = content.match(reTemplate);
const component = content.match(reComponent).map((el) => el.replace('] ', '').replace(',', ''));
const dir = content.match(reDir);

for (let i = 0; i < parentObjects.length; i++) {
  const reSection =
    parentObjects[i + 1] === undefined
      ? new RegExp(`${parentObjects[i]}([\\s\\S]+?)}`, 'gmi')
      : new RegExp(`${parentObjects[i]}([\\s\\S]+?)${parentObjects[i + 1]}`, 'gmi');

  const section = content.match(reSection);
}
