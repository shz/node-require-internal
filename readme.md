# require-internal [![Build Status](https://travis-ci.org/shz/node-require-internal.png)](https://travis-ci.org/shz/node-require-internal)

Import a module, and expose its internals.  Primarily intended for
testing functions that would normally be hidden, but you can probably
also do other kinds of hacker with it.

Note: the internals seem to be read only on v0.10.x.  I'm not sure why;
if you know, tell me!

## Usage

### Installation

```bash
npm install require-internal
```

### Example

```javascript
var ri = require('require-internal'),
    myModule = ri.require('./my-module'),
    myModuleInternals = ri.getInternals(myModule);

myModule.something === myModuleInternals.exports.something;
myModuleInternals.someHiddenFunction();
```

See the [`example/`](example/) folder for a bit more clarity.

## License

Public domain, see [license.txt](license.txt) for details.
