const fs = require('file-system');
const { resolve } = require('path');
const startEsLint = require('../src/functions/starters/startESLint');
const config = require('../src/configPath');

const arr = new Array(100);
const str = 'content';
const content = arr.fill(str.repeat(1000)).toString();
//console.log(content);

const path = resolve(__dirname, 'files/file.txt');
fs.writeFileSync(path, content);

const eslintConfig = require(config.eslintConfigPath);

startEsLint({ eslintConfig, outputPath: path }).catch((error) => {
  process.exitCode = 1;
  console.error(error);
});

const file = fs.readFileSync(path, 'utf8');
if (file) {
  console.log('ok');
}
