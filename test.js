
const test = require('tape');
const playerJs = require('./Player');


test('correct card value',
  function (t) {
    t.equal(playerJs.toNum('J'), 11);
    t.end();
  }
);
