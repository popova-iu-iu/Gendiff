import * as path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildTree from './buildDiff.js';
import getFormat from './formatters/index.js';
import { extname, resolve } from 'path';

const getParse = (file) => {
  const extention = extname(file);
  const getData = readFileSync(resolve(file), 'utf-8');
  return parse[extention](getData)
};


const genDiff = (path1, path2, format = 'stylish') => {
  const file1 = getParse(path1);
  const file2 = getParse(path2);

  const diff = buildTree(file1, file2);
  const diffFormat = getFormat(diff, format);

  return diffFormat;
};

export default genDiff;
