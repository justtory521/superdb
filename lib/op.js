const { isString, isArray } = require('lodash');
const { paramsType } = require('./utils/helper');

class Op {
  constructor() {
    this.or = Symbol.for('or');
    this.and = Symbol.for('and');
    this.pure = Symbol.for('pure');
    this.flag = Symbol.for('flag');
  }

  /**
   * 调用该方法，则直接拼接sql ，与key无关
   * @param {*} params
   */
  literal(params) {
    if (!isString(params)) {
      throw new Error('superdb err: superdb err: literal function must String!');
    }
    const result = params;
    return [this.pure, result];
  }

  eq(param) {
    return [this.flag, `= ${paramsType(param)}`];
  }

  ne(param) {
    return [this.flag, `!= ${paramsType(param)}`];
  }

  gte(param) {
    return [this.flag, `>= ${paramsType(param)}`];
  }

  gt(param) {
    return [this.flag, `> ${paramsType(param)}`];
  }

  lte(param) {
    return [this.flag, `<= ${paramsType(param)}`];
  }

  lt(param) {
    return [this.flag, `< ${paramsType(param)}`];
  }

  not(param) {
    return [this.flag, `IS NOT ${paramsType(param)}`];
  }

  is(param) {
    return [this.flag, `IS ${paramsType(param)}`];
  }

  in(param) {
    if (!isArray(param)) throw new Error('superdb err: Op.in function param must array!');
    if (param.length === 0) return [this.pure, false];
    if (param.length === 1) return [this.flag, `= ${paramsType(param)}`];
    return [this.flag, `IN (${paramsType(param)})`];
  }

  notIn(param) {
    if (!isArray(param)) throw new Error('superdb err: Op.notIn function param must array!');
    if (param.length === 1) return [this.flag, `!= ${paramsType(param)}`];
    return [this.flag, `NOT IN (${paramsType(param)})`];
  }

  like(param) {
    return [this.flag, `LIKE ${paramsType(param)}`];
  }

  notLike(param) {
    return [this.flag, `NOT LIKE ${paramsType(param)}`];
  }

  between(param) {
    if (!isArray(param) || param.length !== 2) throw new Error('superdb err: Op.between param must array and have to attr!');
    return [this.flag, `BETWEEN ${paramsType(param[0])} AND ${paramsType(param[1])}`];
  }

  notBetween(param) {
    if (!isArray(param) || param.length !== 2) throw new Error('superdb err: Op.notBetween param must array and have to attr!');
    return [this.flag, `NOT BETWEEN ${paramsType(param[0])} AND ${paramsType(param[1])}`];
  }
}

module.exports = Op;
