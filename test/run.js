var assert = require('assert')
  , ri = require('../lib')
  , m = ri.require('../example/module')
  , internals = ri.getInternals(m)
  ;

// Framework

var results = [];
var test = function(name, f) {
  try {
    f();
    results.push({ok: true, name: name});
  } catch (err) {
    results.push({ok: false, name: name, error: err.message});
  }
};
var done = function() {
  var failed = false;

  // Output in TAP
  console.log('0..' + results.length);
  for (var i=0; i<results.length; i++) {
    var r = results[i];
    console.log(r.ok ? 'ok' : 'not ok', i + 1, '-', r.name);
    if (!r.ok) {
      failed = true;
      console.log('    ' + r.error.split(/\r?\n/).join('\n    '));
    }
  }

  process.exit(failed ? 1 : 0);
};

// Actual tests

test('exports works as expected', function() {
  assert.equal('function', typeof m.somethingPublic);
});
test('internals.something exposed', function() {
  assert.equal(1, internals.something);
});
test('internals.addSomething exposed', function() {
  assert.equal(11, internals.addSomething());
});
test('internals.something read-only', function() {
  internals.something = 10;
  assert.equal(11, internals.addSomething());
});

done();
