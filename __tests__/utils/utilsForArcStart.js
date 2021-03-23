const prettyFormat = require('pretty-format');
const { exec } = require('child_process');
const appRoot = process.cwd();
const stringifyObject = require('stringify-object');
const getObjectWithPaths = require('./getObjectWithPaths');
const parseOutput = require('./parseOutput');

const SnapshotSerializer = () => {
  expect.addSnapshotSerializer({
    test: (val) => val,
    print: (val) => {
      return val.replace(/\\/g, '');
    },
  });
};

const promisifyCliCommand = function (command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        console.error(`exec error: ${error}`);
      } else {
        resolve(stdout);
        console.log(`stdout: ${stdout}`);
      }
    });
  });
};

const returnOutputPathsWithContent = (currentPathToOutput) => {
  const options = {
    maxDepth: 10,
    escapeString: false,
    indent: 2,
    escapeRegex: false,
  };

  const folders = getObjectWithPaths(currentPathToOutput);
  const outputFiles = parseOutput(folders);

  return prettyFormat(outputFiles, options);
};

const returnOutputPaths = (currentPathToOutput) => {
  const reApp = appRoot.replace(/\\/g, '/');

  const folders = getObjectWithPaths(currentPathToOutput);
  return folders.map((folder) => {
    const reRoot = new RegExp(`${reApp}/${currentPathToOutput}/${folder.folder}`, 'g');
    return stringifyObject(folder, {
      indent: '  ',
      singleQuotes: true,
      inlineCharacterLimit: 50,
      transform: (folder, prop, originalResult) => {
        if (prop === 'files') {
          return originalResult.replace(/\\/g, '/').replace(reRoot, folder.folder);
        } else {
          return originalResult;
        }
      },
    });
  });
};

module.exports = { returnOutputPathsWithContent, promisifyCliCommand, returnOutputPaths, SnapshotSerializer };
