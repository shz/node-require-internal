var something = 1;

var logSomething = function() {
  console.log('Something is', something, 'from the inside');
};

var addSomething = function() {
  return something + 10;
};

exports.somethingPublic = function() {
  console.log('Something public');
};
