import * as path from 'path';
import yaml from 'js-yaml';

const parse = (file) => {
  const format = path.extname(file);

  let method;
  if (format === '.json') {
    method = JSON.parse;
  } else if (format === '.yaml' || format === '.yml') {
    method = yaml.load;
  }

  return method;
};

export default parse;
