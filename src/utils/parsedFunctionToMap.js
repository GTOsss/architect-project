const reGetFunction = new RegExp('.+(?=\\()', 'gm');
const reGetFunctionArgument = /(?<=\().+(?=\))/gm;
const requireFunction = require('../functions/requireFunction');

const parsedFunctionToMap = ({
  parsedFunctions,
  templateParams,
  templateScript,
  template,
  mapCurrentComponent,
  assets,
}) => {
  return parsedFunctions.map(async (el) => {
    let interpolationValue = '';
    let interpolationResult = '';
    const searchFunctionResult = el.str.match(reGetFunction);

    if (searchFunctionResult) {
      const functionInterpolation = searchFunctionResult[0];
      const searchFunctionArgument = el.str.match(reGetFunctionArgument) || [];
      const functionArgument = searchFunctionArgument[0];

      interpolationResult = requireFunction({
        functionName: functionInterpolation,
        variableValue: templateParams[functionArgument],
        resultFileName: templateParams.name,
        templateScript,
        template,
        sectionFromSourceMap: mapCurrentComponent,
        assets,
      });
      interpolationValue = `{{${el.str}}}`;

      return {
        interpolationValue,
        interpolationResult: await interpolationResult,
      };
    } else {
      interpolationValue = el.str ? `{{${el.str}}}` : '';

      if (typeof templateParams[el.str] === 'undefined') {
        console.log(chalk.yellow(`Missing parameter ${chalk.blue(el.str)} in template ${chalk.blue(template)} `));
      }
      interpolationResult = templateParams[el.str];
      return {
        interpolationValue,
        interpolationResult,
      };
    }
  });
};

module.exports = parsedFunctionToMap;
