var req = require('./require');

exports.require = function(p) {
  return req(p, module.parent);
};

exports.getInternals = function(m) {
  // Load by name
  if (typeof m == 'string') {
    m = require.cache[m];
    if (!m)
      throw new Error('Cannot get sandbox for ' + m + ', it hasn\'t been loaded yet');
  }

  // Load by exports content
  for (var i in require.cache) if (require.cache.hasOwnProperty(i)) {
    if (require.cache[i].exports == m) {
      m = require.cache[i];
      break;
    }
  }

  if (!m._sandbox)
    throw new Error('Could not get sandbox for module ' + m.id);

  return m._sandbox;
};
