const crypto = require('crypto');

// js type
const jsType = (type) => {
  if (['Undefined', 'Null', 'Number', 'String', 'Object', 'Array', 'Boolean', 'Function', 'Symbol', 'Date', 'RegExp', 'Error'].includes(type)) {
    return source => Object.prototype.toString.apply(source) === `[object ${type}]`;
  } if (['NaN', 'Integer', 'Finite', 'SafeInteger'].includes(type)) {
    return Number[`is${type}`];
  }
  throw new Error('superdb err: superdb err: JsType No this type！');
};

const paramsType = (param) => {
  if (jsType('String')(param)) {
    return `'${param}'`;
  } if (jsType('Number')(param)) {
    return +param;
  } if (jsType('Array')(param)) {
    const arr = [];
    for (const attr of param) {
      arr.push(`${paramsType(attr)}`);
    }
    return arr.join(', ');
  } if (jsType('Undefined')(param)) {
    return 'NULL';
  }
  return param;
};

const md5 = (source) => {
  const hash = crypto.createHash('md5');
  return hash.update(source).digest('hex');
};

module.exports = { paramsType, md5, jsType };
