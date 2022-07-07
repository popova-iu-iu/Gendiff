import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
  const expected = readFileSync(getFixturePath('diffTest.txt'), 'utf-8');
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('yml', () => {
  const expected = readFileSync(getFixturePath('diffTest.txt'), 'utf-8');
  const result = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yaml'));
  expect(result).toEqual(expected);
});

test('plain test', () => {
  const expected = readFileSync(getFixturePath('plain.txt'), 'utf-8');

  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(result).toEqual(expected);
});

test('json test', () => {
  const expected = readFileSync(getFixturePath('json.txt'), 'utf-8');

  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(result).toEqual(expected);
});
