import _ from 'lodash';
import * as path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';

// const parseFile = (filepath) => {
//   const path = isAbsolute(filepath) ? filepath : resolve(filepath);
//   const file = fs.readFileSync(path, 'utf-8');
//   return parse(file);
// };

const prepareData = (file) => readFileSync(path.resolve(file));

const getData = (file) => {
  const readyData = prepareData(file);
  const parseMethod = parse(file);

  return parseMethod(readyData);
};

const genDiff = (filepath1, filepath2) => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const keys = Object.keys({ ...file1, ...file2 });

  const result = _.sortBy(keys, (key) => key)
    .map((key) => {
      if (!_.has(file2, key)) {
        return `- ${key}: ${file1[key]}`;
      }
      if (!_.has(file1, key)) {
        return `+ ${key}: ${file2[key]}`;
      }
      if (file1[key] === file2[key]) {
        return `  ${key}: ${file1[key]}`;
      }
      return `- ${key}: ${file1[key]}\n + ${key}: ${file2[key]}`;
    })
    .join('\n ');
  return `{\n ${result}\n}`;
};

export default genDiff;
