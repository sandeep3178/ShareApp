var rand = function() {
  return Math.random()
    .toString(36)
    .substr(2); // remove `0.`
};

var token = function() {
  var Token = rand() + rand(); // to make it longer

  return Token;
};

module.exports = token;
