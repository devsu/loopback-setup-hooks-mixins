'use strict';

module.exports = {
  getModelMock,
};

function getModelMock() {
  let theModel = {
    modelName: 'MyModel',
    observe: jasmine.createSpy('observe'),
    beforeRemote: jasmine.createSpy('beforeRemote'),
    afterRemote: jasmine.createSpy('afterRemote'),
    afterRemoteError: jasmine.createSpy('afterRemoteError'),
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
