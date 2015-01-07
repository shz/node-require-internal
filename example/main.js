var ri = require('../lib')
  , m = ri.require('./module')
  ;

m.somethingPublic();

var internals = ri.getInternals(m);
console.log('Something is', internals.something, 'from the outside');
internals.logSomething();
