'use strict';

const _ = require('lodash');
const path = require('path');
const debug = require('debug')('loopback:contrib:setup-hooks-mixins');
const utils = require('./lib/utils');

module.exports = (Model, options) => {
  let methods = Model;
  if (options.source) {
    methods = require(path.join(process.cwd(), options.source));
  }
  options = _.pickBy(options, (value, key) => {
    return key !== 'source';
  });
  let keys = Object.keys(options);

  keys.forEach(processOption);

  function processOption(key) {
    var methodsNames = getMethodsNames(key);
    methodsNames.forEach((methodName) => {
      debug('Model `%s`: Setup hook:  `%s`: `%s`', Model.modelName, key, methodName);
      let method = utils.getMethodWithName(methods, methodName);
      Model.observe(key, method);
    });
  }

  function getMethodsNames(key) {
    let methodsNames = options[key];
    if (!Array.isArray(methodsNames)) {
      methodsNames = [methodsNames];
    }
    return methodsNames;
  }
};
