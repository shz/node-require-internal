// Output test results using TAP

var results = [];

process.once('exit', function() {
  var failed = false;

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
});

module.exports = function(name, f) {
  try {
    f();
    results.push({ok: true, name: name});
  } catch (err) {
    results.push({ok: false, name: name, error: err.message});
  }
};
