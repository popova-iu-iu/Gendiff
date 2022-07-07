import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (!_.has(object1, key)) {
      return {
        key,
        value: value2,
        type: 'added',
      };
    }

    if (!_.has(object2, key)) {
      return {
        key,
        value: value1,
        type: 'deleted',
      };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        children: buildDiff(value1, value2),
        type: 'nested',
      };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        key,
        value1,
        value2,
        type: 'different',
      };
    }

    return {
      key,
      value: value1,
      type: 'unupdated',
    };
  });
  return result;
};

export default (object1, object2) => ({ type: 'main', children: buildDiff(object1, object2) });
