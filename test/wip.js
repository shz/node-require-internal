var ri = require('../lib');

var testFile = ri.require('./test_file');
var internals = ri.getInternals(testFile);

console.log(testFile.inc(1), internals.foo(1));
