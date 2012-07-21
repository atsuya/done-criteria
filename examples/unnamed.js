var DoneCriteria = require('../lib/done-criteria')
  , exit = false;

var doneCriteria = new DoneCriteria(['unko', 'geri'], function() {
  console.log('all done!');
  exit = true;
});

setTimeout(function() { doneCriteria.done('unko'); }, 1000);
setTimeout(function() { doneCriteria.done('geri'); }, 2000);

var loop = function() {
  if (exit) {
    process.exit(0);
  } else {
    console.log('not done yet...');
    setTimeout(loop, 500);
  }
};
loop();
