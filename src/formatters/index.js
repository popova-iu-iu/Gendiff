import stylish from './stylish.js';

const getFormat = (diff, format) => {
  const formatters = {
    stylish,
  };
  const formatter = formatters[format];
  return formatter(diff);
};

export default getFormat;
