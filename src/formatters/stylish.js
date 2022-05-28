import _ from 'lodash';

const space = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (tree, depth, stylish) => {
  if (!_.isObject(tree)) {
    return String(tree);
  }

  const result = Object.entries(tree)
    .map(([key, value]) => stylish({ type: 'unupdated', key, value }, depth + 1));

  return `{\n${result.join('\n')}\n${space(depth)}  }`;
};

const stylish = (node, depth = 0) => {
  switch (node.type) {
    case 'main': {
      const result = node.children.flatMap((child) => stylish(child, depth + 1));
      return `{\n${result.join('\n')}\n}`;
    }
    case 'nested': {
      const result = node.children.flatMap((child) => stylish(child, depth + 1));
      return `${space(depth)}  ${node.key}: {\n${result.join('\n')}\n${space(depth)}  }`;
    }
    case 'plus': {
      return `${space(depth)}+ ${node.key}: ${stringify(node.value, depth, stylish)}`;
    }
    case 'minus': {
      return `${space(depth)}- ${node.key}: ${stringify(node.value, depth, stylish)}`;
    }
    case 'unupdated':
      return `${space(depth)}  ${node.key}: ${stringify(node.value, depth, stylish)}`;
    case 'different': {
      const { key, value1, value2 } = node;
      const data1 = `${space(depth)}- ${key}: ${stringify(value1, depth, stylish)}`;
      const data2 = `${space(depth)}+ ${key}: ${stringify(value2, depth, stylish)}`;
      return `${data1}\n${data2}`;
    }
    default:
      return '';
  }
};

export default stylish;
