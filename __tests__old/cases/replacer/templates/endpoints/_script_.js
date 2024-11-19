// const fs = require('fs');
// const path = require('path');
// const { parse } = require('node-html-parser');
// const methods = require('../../methods');
// // const axios = require('axios');
// const { createEndpointsBySwaggerSpec, createTypesFromSchemesBySwaggerSpec } = require('../../swagger');
//
// const swaggerSpec = require('../../data/swagger/swagger');
//
// // const getSwaggerSpec = async () => {
// //   swaggerSpec = await axios.get('https://petstore.swagger.io/v2/swagger.json');
// //   // const pathToSwaggerHTML = path.resolve(__dirname, '../../data/swagger/Swagger UI.html');
// //   // const swaggerHTML = fs.readFileSync(pathToSwaggerHTML).toString();
// //   // const parsedSwaggerHTML = parse(swaggerHTML);
// //   // const selectorResult = parsedSwaggerHTML.querySelector('#swagger-data');
// //   // const swaggerDataRaw = selectorResult.childNodes[0].rawText;
// //   // const jsonSwagger = JSON.parse(swaggerDataRaw);
// //   //
// //   // return jsonSwagger.spec;
// // };
//
// const typesMap = {
//   integer: 'number',
//   int: 'number',
//   string: 'string',
//   boolean: 'boolean',
//   object: 'Record<string, any>', // если в scheme только type: object
//   '*': 'any', // any если не удалось определить тип
// };
//
// const overrideFieldTypesMap = {
//   id: 'ID',
// };
//
// const templateEffect = ({
//   requestFunction: { params, typeParamsNamesMap, paramsWithTypeCode },
//   URLGetter,
//   method,
//   swagger,
// }) => {
//   const urlParams = typeParamsNamesMap.path ? 'urlParams' : '';
//   const fxMethodBodyTemplateMap = {
//     get: () => {
//       const query = params.includes('query') ? ', query' : '';
//       return `API.getFx({url: urls.${URLGetter.name}(${urlParams})${query}})`;
//     },
//     post: () => {
//       const data = params.includes('data') ? ', data' : '';
//       return `API.postFx({url: urls.${URLGetter.name}(${urlParams})${data}})`;
//     },
//     put: () => {
//       const data = params.includes('data') ? ', data' : '';
//       return `API.putFx({url: urls.${URLGetter.name}(${urlParams})${data}})`;
//     },
//     patch: () => {
//       const data = params.includes('data') ? ', data' : '';
//       return `API.patchFx({url: urls.${URLGetter.name}(${urlParams})${data}})`;
//     },
//     delete: () => `API.deleteFx({urls: urls.${URLGetter.name}(${urlParams})})`,
//   };
//
//   const effectName = `${URLGetter.name}Fx`;
//   const effectBody = fxMethodBodyTemplateMap[method]();
//   const resultType = typeParamsNamesMap.result;
//   const resultAs = `Promise<${resultType}>`;
//   const code = `export const ${effectName} = createEffect(async (${paramsWithTypeCode}) => ${effectBody} as ${resultAs})`;
//   const jsDoc = swagger.summary ? `/**\n* ${swagger.summary}\n*/` : '';
//
//   return [jsDoc, code].join('\n');
// };
//
// /**
//  *
//  * @param URLGetter
//  * @param requestFunction
//  * @returns {string}
//  */
// const templateEffectTypes = ({ URLGetter, requestFunction }) =>
//   [
//     `/** ******* ${methods.toCamelCase(URLGetter.name)} */`,
//     requestFunction.typeParamsMap.path,
//     requestFunction.typeParamsMap.query,
//     requestFunction.typeParamsMap.data,
//     requestFunction.typeParamsMap.params,
//     requestFunction.typeParamsMap.result,
//   ]
//     .filter(Boolean)
//     .join('\n');
//
// const { endpoints } = createEndpointsBySwaggerSpec({
//   swaggerSpec,
//   prefixCountNode: 2,
//   typesMap,
//   overrideFieldTypesMap,
// });
//
// const URLGetters = [];
// const effects = [];
// const effectTypes = [];
// const effectTypesImport = [];
//
// endpoints.forEach((endpoint) => {
//   URLGetters.push(endpoint.URLGetter.code);
//   effects.push(templateEffect(endpoint));
//   effectTypes.push(templateEffectTypes(endpoint));
//   effectTypesImport.push(endpoint.requestFunction.typeParamsNamesMap.params);
//   effectTypesImport.push(endpoint.requestFunction.typeParamsNamesMap.result);
// });
//
// const getURLGetters = () => URLGetters.join('\n');
//
// const { typeCodes, typeNames } = createTypesFromSchemesBySwaggerSpec({ swaggerSpec, typesMap, overrideFieldTypesMap });
//
// const getImportCommonTypes = () => `{${typeNames}}`;
//
// const getCommonTypes = () => typeCodes.join('\n');
//
// const getEffects = () => effects.join('\n\n');
//
// const getEffectTypes = () => effectTypes.join('\n\n');
//
// const getTypesForEffects = () => `{${effectTypesImport.filter(Boolean)}}`;
const returnText = () => {
  return 'test ';
};

const asyncFunction = async () => {
  return await new Promise((resolve) => {
    setTimeout(resolve, 1000, returnText());
  });
};

module.exports = { asyncFunction };
