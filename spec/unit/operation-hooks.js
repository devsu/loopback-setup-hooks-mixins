'use strict';

const Promise = require('bluebird');

module.exports = {
  doSomething,
  checkSomething,
  obj: {
    doSomethingElse: doSomething,
  },
  hooks: {
    otherObj: {
      doSomethingElse: doSomething,
    },
  },
};

function doSomething(context) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

function checkSomething(context) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
