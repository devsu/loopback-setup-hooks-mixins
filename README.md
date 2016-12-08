# loopback-setup-hooks-mixins
Mixin for Loopback, to easily configure operation and remote hooks from the model configuration file.

## Installation

```bash
npm install --save loopback-setup-hooks-mixins
```

## Available mixins

- [SetupRemoteHooks](#setupremotehooks)
- [SetupOperationHooks](#setupoperationhooks)

## Usage

### As a mixin (recommended)

First, modify your server/model-config.json to include the path to this module:

```json
{
  "mixins": [
    "loopback/common/mixins",
    "loopback/server/mixins",
    "../common/mixins",
    "./mixins",
    "../node_modules/loopback-setup-hooks-mixins"
  ]
}
```

Then you can [use the mixins](https://loopback.io/doc/en/lb2/Defining-mixins.html#enable-a-model-with-mixins) from your model definition files:

```json
...
  "mixins": {
    "SetupOperationHooks": {
      "source": "./common/models/employee-hooks.js",
      "before save": ["doSomething"],
      "before delete": ["checkSomething"]
    },
    "SetupRemoteHooks": {
      "source": "./common/models/employee-hooks.js",
      "beforeRemote": {
        "deleteById": ["checkSomethingElse"],
      },
      "afterRemote": {
        "create": ["doSomethingElse"]
      }
    }
  }
...
```

## SetupOperationHooks

Configures the defined operation hooks in the model.

### Options

- source (optional)
- name of the operation hooks (e.g. "before save", "after save", etc.)

### Usage

For each [operation hook](http://loopback.io/doc/en/lb3/Operation-hooks.html) that you want to configure, you will need to define a **string** or an **array** with the name(s) of the method(s) that should be called.

If you define `source`, it will search the methods on that file, otherwise it will search the methods in the Model.

```json
  "mixins": {
    "SetupOperationHooks": {
      "source": "./common/models/employee-hooks.js",
      "before save": "doSomething",
      "before delete": ["checkSomething", "doSomethingElse"]
    }
  }
```

The source file (`employee-hooks.js` in our example) would look like this:

```javascript
const Promise = require('bluebird');

module.exports = {
  doSomething,
  checkSomething,
  doSomethingElse,
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

function doSomethingElse(context) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
```

The example is using promises, but if your prefer you could use the next callback as well.

## SetupRemoteHooks

Configures the defined remote hooks in the model.

### Options:
- source (optional)
- beforeRemote
- afterRemote

### Usage

In the `beforeRemote` and `afterRemote` options, you should define an **object** that contains a map with the remote method names you want to apply the hooks to. 

Each item of the map should contain an **array** with the names of the methods to be called.
 
If you define `source`, it will search the methods on that file, otherwise it will search the methods in the Model.

```json
  "mixins": {
    "SetupRemoteHooks": {
      "source": "./common/models/employee-hooks.js",
      "beforeRemote": {
        "deleteById": ["checkSomething", "logSomething"],
      },
      "afterRemote": {
        "create": ["doSomething"]
      }
    }
  }
```

The source file (`employee-hooks.js` in our example) would look like this:

```javascript
module.exports = {
  doSomething,
  checkSomething,
  logSomething,
};

function doSomething(context, instance, next) {
  next();
}

function checkSomething(context, instance, next) {
  next();
}

function logSomething(context, instance, next) {
  next();
}
```

This example is not using promises, since it looks like they are not still supported in remote hooks yet.
