'use strict';

const mocks = require('./mocks');
const setupRemoteHooks = require('../../setup-remote-hooks');
const hooks = require('./hooks');
const path = require('path');

describe('setup remote hooks', () => {
  let Model, options;

  beforeEach(() => {
    Model = mocks.getModelMock();
    options = {};
  });

  describe('beforeRemote option', () => {
    describe('when the value is an array', () => {
      beforeEach(() => {
        options.beforeRemote = {
          'deleteById': ['doSomething', 'obj.doSomethingElse', 'hooks.otherObj.doSomethingElse'],
        };
      });

      it('should call the beforeRemote method for each element', () => {
        setupRemoteHooks(Model, options);
        expect(Model.beforeRemote).toHaveBeenCalledTimes(3);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById', Model.obj.doSomethingElse);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById',
          Model.hooks.otherObj.doSomethingElse);
      });
    });

    describe('when is a string', () => {
      beforeEach(() => {
        options.beforeRemote = {
          'deleteById': 'doSomething',
        };
      });

      it('should call the beforeRemote method', () => {
        setupRemoteHooks(Model, options);
        expect(Model.beforeRemote).toHaveBeenCalledTimes(1);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
      });
    });
  });

  describe('"before remote" variant', () => {
    describe('when the value is an array', () => {
      beforeEach(() => {
        options['before remote'] = {
          'deleteById': ['doSomething', 'obj.doSomethingElse', 'hooks.otherObj.doSomethingElse'],
        };
      });

      it('should call the beforeRemote method for each element', () => {
        setupRemoteHooks(Model, options);
        expect(Model.beforeRemote).toHaveBeenCalledTimes(3);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById', Model.obj.doSomethingElse);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById',
          Model.hooks.otherObj.doSomethingElse);
      });
    });

    describe('when is a string', () => {
      beforeEach(() => {
        options['before remote'] = {
          'deleteById': 'doSomething',
        };
      });

      it('should call the beforeRemote method', () => {
        setupRemoteHooks(Model, options);
        expect(Model.beforeRemote).toHaveBeenCalledTimes(1);
        expect(Model.beforeRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
      });
    });
  });

  describe('afterRemote option', () => {
    describe('when the value is an array', () => {
      beforeEach(() => {
        options.afterRemote = {
          'deleteById': ['doSomething', 'obj.doSomethingElse', 'hooks.otherObj.doSomethingElse'],
        };
      });

      it('should call the afterRemote method for each element', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemote).toHaveBeenCalledTimes(3);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById', Model.obj.doSomethingElse);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById',
          Model.hooks.otherObj.doSomethingElse);
      });
    });

    describe('when is a string', () => {
      beforeEach(() => {
        options.afterRemote = {
          'deleteById': 'doSomething',
        };
      });

      it('should call the afterRemote method', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemote).toHaveBeenCalledTimes(1);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
      });
    });
  });

  describe('"after remote" variant', () => {
    describe('when the value is an array', () => {
      beforeEach(() => {
        options['after remote'] = {
          'deleteById': ['doSomething', 'obj.doSomethingElse', 'hooks.otherObj.doSomethingElse'],
        };
      });

      it('should call the afterRemote method for each element', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemote).toHaveBeenCalledTimes(3);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById', Model.obj.doSomethingElse);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById',
          Model.hooks.otherObj.doSomethingElse);
      });
    });

    describe('when is a string', () => {
      beforeEach(() => {
        options['after remote'] = {
          'deleteById': 'doSomething',
        };
      });

      it('should call the afterRemote method', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemote).toHaveBeenCalledTimes(1);
        expect(Model.afterRemote).toHaveBeenCalledWith('deleteById', Model.doSomething);
      });
    });
  });

  describe('afterRemoteError option', () => {
    describe('when the value is an array', () => {
      beforeEach(() => {
        options.afterRemoteError = {
          'deleteById': ['doSomething', 'obj.doSomethingElse', 'hooks.otherObj.doSomethingElse'],
        };
      });

      it('should call the afterRemoteError method for each element', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemoteError).toHaveBeenCalledTimes(3);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById', Model.doSomething);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById', Model.obj.doSomethingElse);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById',
          Model.hooks.otherObj.doSomethingElse);
      });
    });

    describe('when is a string', () => {
      beforeEach(() => {
        options.afterRemoteError = {
          'deleteById': 'doSomething',
        };
      });

      it('should call the afterRemoteError method', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemoteError).toHaveBeenCalledTimes(1);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById', Model.doSomething);
      });
    });
  });

  describe('"after remote error" variant', () => {
    describe('when the value is an array', () => {
      beforeEach(() => {
        options['after remote error'] = {
          'deleteById': ['doSomething', 'obj.doSomethingElse', 'hooks.otherObj.doSomethingElse'],
        };
      });

      it('should call the afterRemoteError method for each element', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemoteError).toHaveBeenCalledTimes(3);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById', Model.doSomething);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById', Model.obj.doSomethingElse);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById',
          Model.hooks.otherObj.doSomethingElse);
      });
    });

    describe('when is a string', () => {
      beforeEach(() => {
        options['after remote error'] = {
          'deleteById': 'doSomething',
        };
      });

      it('should call the afterRemoteError method', () => {
        setupRemoteHooks(Model, options);
        expect(Model.afterRemoteError).toHaveBeenCalledTimes(1);
        expect(Model.afterRemoteError).toHaveBeenCalledWith('deleteById', Model.doSomething);
      });
    });
  });

  describe('when source option is defined', () => {
    let originalCWD;

    beforeAll(() => {
      // Modifying process.cwd, to test that it will be taken into account to get the source file
      originalCWD = process.cwd;
      process.cwd = () => {
        return path.join(originalCWD(), 'spec');
      };
    });

    afterAll(() => {
      // reverting the change we made
      process.cwd = originalCWD;
    });

    beforeEach(() => {
      options.beforeRemote = {
        'findById': ['doSomething', 'obj.doSomethingElse'],
      };
      options.afterRemote = {
        'create': 'checkSomething',
      };
      options.source = './unit/hooks.js';
    });

    it('Should add the hooks in the model using the methods in the file', () => {
      setupRemoteHooks(Model, options);
      expect(Model.beforeRemote).toHaveBeenCalledTimes(2);
      expect(Model.beforeRemote).toHaveBeenCalledWith('findById', hooks.doSomething);
      expect(Model.beforeRemote).toHaveBeenCalledWith('findById', hooks.obj.doSomethingElse);
      expect(Model.afterRemote).toHaveBeenCalledTimes(1);
      expect(Model.afterRemote).toHaveBeenCalledWith('create', hooks.checkSomething);
    });
  });
});
