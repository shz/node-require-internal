var assert = require('assert')
  , test = require('./framework')
  , ri = require('../lib')
  , m = null // Filled in later
  , internals = null // Filled in later
  ;

test('can require', function() {
  m = ri.require('../example/module');
});
test('can get internals', function() {
  internals = ri.getInternals(m);
});
test('exports works as expected', function() {
  assert.equal('function', typeof m.somethingPublic);
});
test('internals.something exposed', function() {
  assert.equal(1, internals.something);
});
test('internals.addSomething exposed', function() {
  assert.equal(11, internals.addSomething());
});

// On 0.10 this seems to be readonly, so let's count on that
if (process.version.match(/v0\.10/)) {
  test('internals.something read-only', function() {
    internals.something = 10;
    assert.equal(11, internals.addSomething());
  });
}

test('cannot use on built on regular packages', function() {
  assert.throws(function() {
    ri.require('path');
  }, /modules/);
});
test('cannot use on already imported modules', function() {
  assert.throws(function() {
    ri.require('../lib/index'); // We already imported this via normal means
  }, /already/);
});
