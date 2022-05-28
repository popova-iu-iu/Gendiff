import * as path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildTree from './buildDiff.js';
import getFormat from './formatters/index.js';

const getPath = (file) => path.resolve(process.cwd(), file);

const readFile = (filepath) => readFileSync(filepath, 'utf-8');

const getFileFormat = (file) => path.extname(file).slice(1);

const genDiff = (file1, file2, format = 'stylish') => {
  const path1 = getPath(file1);
  const path2 = getPath(file2);

  const object1 = parse(readFile(path1), getFileFormat(file1));
  const object2 = parse(readFile(path2), getFileFormat(file2));

  const diff = buildTree(object1, object2);
  const diffFormat = getFormat(diff, format);

  return diffFormat;
};

export default genDiff;
