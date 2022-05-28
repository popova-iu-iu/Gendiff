import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff', () => {  
  const expected = readFileSync(getFixturePath('diffTest.txt'), 'utf-8');
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  console.log(expected.length);
  console.log(result.length);
  console.log(expected === result)
  expect(result).toEqual(expected);
});
