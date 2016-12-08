'use strict';

module.exports = {
  getModelMock,
};

function getModelMock() {
  let theModel = {
    modelName: 'MyModel',
    observe: jasmine.createSpy('observe'),
    doSomething: () => {},
    checkSomething: () => {},
    obj: {
      doSomethingElse: () => {},
    },
    hooks: {
      otherObj: {
        doSomethingElse: () => {},
      },
    },
  };

  return theModel;
}
