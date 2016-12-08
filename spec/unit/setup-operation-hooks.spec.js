'use strict';

const mocks = require('./mocks');
const setupOperationHooks = require('../../setup-operation-hooks');
const operationHooks = require('./operation-hooks');
const path = require('path');

describe('setup operation hooks', () => {
  let Model, options;

  beforeEach(() => {
    Model = mocks.getModelMock();
    options = {
      'before save': ['doSomething', 'checkSomething'],
      'before delete': ['obj.doSomethingElse', 'hooks.otherObj.doSomethingElse'],
      'after save': 'doSomething',
    };
  });

  describe('when source option is defined', () => {
    let originalCWD;

    beforeAll(() => {
      // Modifying process.cwd, to test that it will be taken into account to get the source file
      originalCWD = process.cwd();
      process.cwd = () => {
        return path.join(originalCWD, 'spec');
      };
    });

    afterAll(() => {
      // reverting the change we made
      process.cwd = originalCWD;
    });

    beforeEach(() => {
      options.source = './unit/operation-hooks.js';
    });

    it('Should add the hooks in the model using the methods in the file', () => {
      setupOperationHooks(Model, options);
      expect(Model.observe).toHaveBeenCalledTimes(5);
      expect(Model.observe).toHaveBeenCalledWith('before save', operationHooks.doSomething);
      expect(Model.observe).toHaveBeenCalledWith('before save', operationHooks.checkSomething);
      expect(Model.observe).toHaveBeenCalledWith('before delete',
        operationHooks.obj.doSomethingElse);
      expect(Model.observe).toHaveBeenCalledWith('before delete',
        operationHooks.hooks.otherObj.doSomethingElse);
      expect(Model.observe).toHaveBeenCalledWith('after save', operationHooks.doSomething);
    });
  });

  describe('when source option is undefined', () => {
    beforeEach(() => {
      options.source = undefined;
    });

    it('Should add the hooks in the model using the methods in the Model', () => {
      setupOperationHooks(Model, options);
      expect(Model.observe).toHaveBeenCalledTimes(5);
      expect(Model.observe).toHaveBeenCalledWith('before save', Model.doSomething);
      expect(Model.observe).toHaveBeenCalledWith('before save', Model.checkSomething);
      expect(Model.observe).toHaveBeenCalledWith('before delete', Model.obj.doSomethingElse);
      expect(Model.observe).toHaveBeenCalledWith('before delete',
        Model.hooks.otherObj.doSomethingElse);
      expect(Model.observe).toHaveBeenCalledWith('after save', Model.doSomething);
    });
  });
});
