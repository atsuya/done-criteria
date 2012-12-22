var DoneCriteria = require('../lib/done-criteria')
  , exit = false;

var doneCriteria = new DoneCriteria(3, function(error) {
  console.log('all done!');
  exit = true;
});

setTimeout(function() { doneCriteria.done(); }, 200);
setTimeout(function() { doneCriteria.done(); }, 400);
setTimeout(function() { doneCriteria.done(); }, 600);

var loop = function() {
  if (exit) {
    process.exit(0);
  } else {
    console.log('not done yet...');
    setTimeout(loop, 500);
  }
};
loop();
