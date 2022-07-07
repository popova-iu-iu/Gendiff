import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};

const plain = (tree) => {
  const iter = (node, path = '') => {
    const {
      key,
      type,
      value,
      children,
      value1,
      value2,
    } = node;

    switch (type) {
      case 'main': {
        const output = children.flatMap((child) => plain(child, key));
        return output.join('\n');
      }
      case 'nested': {
        const output = _.compact(children.flatMap((child) => iter(child, `${path}${key}.`)));
        return output.join('\n');
      }
      case 'added':
        return `Property '${path}${key}' was added with value: ${getValue(value)}`;
      case 'deleted':
        return `Property '${path}${key}' was removed`;
      case 'different': {
        return `Property '${path}${key}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
      }
      default:
        return '';
    }
  };
  return iter(tree);
};

export default plain;
