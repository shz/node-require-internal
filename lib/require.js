var fs = require('fs')
  , _path = require('path')
  , Module = require('module')
  , compile = require('./compile')
  ;

module.exports = function(path, parent) {
  // Resolve paths based off the *parent* module's location
  var resolved = Module._resolveFilename(path, parent);

  // We don't do native modules
  if (resolved.indexOf(_path.sep) < 0)
    throw new Error('Cannot use require-internal with builtin modules');

  // Look for entries in the module cache.  If there's something there
  // that *wasn't* imported by us, panic.
  var cached = require.cache[resolved];
  if (cached) {
    if (!cached._sandbox)
      throw new Error('Module has already been loaded without require-internal');
    return cached.exports;
  }

  // We have to set _contextLoad to true to force the implementation to
  // use the sandbox we've constructed.  We'll save the previous value
  // and restore.
  var _contextLoad = Module._contextLoad;
  Module._contextLoad = true;

  // Compile the module and set it up
  var m = new Module(path, module.parent);
  var sandbox = {};
  compile.call(m, sandbox, fs.readFileSync(resolved, {encoding: 'utf8'}), resolved);
  m._sandbox = sandbox;
  require.cache[resolved] = m;

  // Restore contextLoad to the original
  Module._contextLoad = _contextLoad;

  return m.exports;
};
