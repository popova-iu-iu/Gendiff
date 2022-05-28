import yaml from 'js-yaml';

const parse = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    default:
      return 'Unknown format';
  }
};

export default parse;
