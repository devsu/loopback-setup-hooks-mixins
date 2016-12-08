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

  if (options['before remote']) {
    options.beforeRemote = _.assign(options.beforeRemote, options['before remote']);
  }

  if (options['after remote']) {
    options.afterRemote = _.assign(options.afterRemote, options['after remote']);
  }

  if (options['after remote error']) {
    options.afterRemoteError = _.assign(options.afterRemoteError, options['after remote error']);
  }

  if (options.beforeRemote) {
    setupRemoteHooks(Model.beforeRemote, options.beforeRemote);
  }

  if (options.afterRemote) {
    setupRemoteHooks(Model.afterRemote, options.afterRemote);
  }

  if (options.afterRemoteError) {
    setupRemoteHooks(Model.afterRemoteError, options.afterRemoteError);
  }

  function setupRemoteHooks(setupMethod, opt) {
    let keys = Object.keys(opt);

    keys.forEach((key) => {
      let methodsNames = opt[key];
      if (!Array.isArray(methodsNames)) {
        methodsNames = [methodsNames];
      }
      methodsNames.forEach((methodName) => {
        debug('Model `%s`: setup remote hook: `%s`: `%s`', Model.modelName, key, methodName);
        let method = utils.getMethodWithName(methods, methodName);
        setupMethod.apply(Model, [key, method]);
      });
    });
  }
};
