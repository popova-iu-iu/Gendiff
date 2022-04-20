import _ from 'lodash';
import { isAbsolute, resolve } from 'path';
import fs from 'fs';

const parseFile = (filepath) => {
  const path = isAbsolute(filepath) ? filepath : resolve(filepath);
  const file = fs.readFileSync(path, 'utf-8');
  return JSON.parse(file);
};

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);
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
