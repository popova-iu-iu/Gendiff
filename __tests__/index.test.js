import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import { describe } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('resultStylish.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedJson = readFile('resultJson.txt');

const extensions = ['yml', 'json'];

describe('test', () => {
  test.each(extensions)('format %p', (extension) => {
    const beforePath = getFixturePath(`fileBefore.${extension}`);
    const afterPath = getFixturePath(`fileAfter.${extension}`);

    expect(genDiff(beforePath, afterPath, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(beforePath, afterPath, 'plain')).toEqual(expectedPlain);
    expect(genDiff(beforePath, afterPath, 'json')).toEqual(expectedJson);
    expect(genDiff(beforePath, afterPath)).toEqual(expectedStylish);
  });
});
