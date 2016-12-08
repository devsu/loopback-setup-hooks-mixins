'use strict';

module.exports = {
  getMethodWithName,
};

function getMethodWithName(obj, methodName) {
  let components = methodName.split('.');
  let method = components.reduce((currentObj, currentComponent) => {
    return currentObj[currentComponent];
  }, obj);
  return method;
}
