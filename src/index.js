import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './buildDiff.js';
import formatter from './formatters/index.js';
import parsers from './parsers.js';

const getExtension = (fileName) => path.extname(fileName).slice(1);

const fullPath = (fileName) => path.resolve(process.cwd(), fileName);
const readFile = (fileName) => readFileSync(fullPath(fileName), 'utf-8');

const genDiff = (path1, path2, format = 'stylish') => {
  const content1 = readFile(path1);
  const content2 = readFile(path2);

  const data1 = parsers(content1, getExtension(path1));
  const data2 = parsers(content2, getExtension(path2));

  const diff = buildTree(data1, data2);

  return formatter(diff, format);
};

export default genDiff;
