import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'path';
import { dirname } from 'path';
import genDiff from '../src/index';

test('gendiffTest', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const getFixturePathFile1 = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  const pathToFile1 = getFixturePathFile1('file1.json');
  const pathToFile2 = getFixturePathFile1('file2.json');

  const data = [
    '  - follow: false',
    '  host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
  ];

  const expected = ['{', ...data, '}'].join('\n');
  // console.log(expected);

  expect(genDiff(pathToFile1, pathToFile2)).toBe(expected);
});
