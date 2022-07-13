import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('resultStylish.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedJson = readFile('resultJson.txt');

const extensions = ['yml', 'json'];

test.each(extensions)('format %s', (extension) => {
  const beforePath = getFixturePath(`fileBefore.${extension}`);
  const afterPath = getFixturePath(`fileAfter.${extension}`);

  expect(genDiff(beforePath, afterPath, 'stylish')).toBe(expectedStylish);
  expect(genDiff(beforePath, afterPath, 'plain')).toBe(expectedPlain);
  expect(genDiff(beforePath, afterPath, 'json')).toBe(expectedJson);
  expect(genDiff(beforePath, afterPath)).toBe(expectedStylish);
});
