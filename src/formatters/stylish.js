import _ from 'lodash';

const space = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }

  const keys = Object.keys(node);
  const result = keys.map((key) => {
    const value = node[key];
    return `${space(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n  ${space(depth)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 0) => {
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
        const result = children.flatMap((child) => iter(child, depth + 1));
        return `{\n${result.join('\n')}\n}`;
      }
      case 'nested': {
        const result = children.flatMap((child) => iter(child, depth + 1));
        return `${space(depth)}  ${key}: {\n${result.join('\n')}\n${space(depth)}  }`;
      }
      case 'added': {
        return `${space(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'deleted': {
        return `${space(depth)}- ${key}: ${stringify(node.value, depth)}`;
      }
      case 'unupdated':
        return `${space(depth)}  ${key}: ${stringify(value, depth)}`;
      case 'different': {
        const data1 = `${space(depth)}- ${key}: ${stringify(value1, depth)}`;
        const data2 = `${space(depth)}+ ${key}: ${stringify(value2, depth)}`;
        return `${data1}\n${data2}`;
      }
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  };

  return iter(tree);
};

export default stylish;
