var foo = function(a) {
  return a + 1;
};

exports.inc = function(i) {
  return foo(i);
};
