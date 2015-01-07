// Most of these are needed by the internal implementation
// of _compile that we're mangling up.
var Module = require('module')
  , path = require('path')
  , runInThisContext = require('vm').runInThisContext
  , runInNewContext = require('vm').runInNewContext
  , debug = function() {}
  ;

// In order to be as future-compatible as possible (though, practically,
// it's very unlikely this will change), we base our custom compile
// implementation on what's built in to node.  To do this, we just
// modify `Module._compile`, turning `sandbox` from a variable to an
// argument.
//
// We need to use `eval` instead of `new Function` in order to give
// access to our local scope, for imports.
eval(
  Module.prototype._compile.toString()
    .replace(/^function\s*\(/, 'function compile(sandbox, ')
    .replace(/var\s+sandbox\s*=\s*{\s*}\s*;\s*[\r\n]*/, '')
);
module.exports = compile;
