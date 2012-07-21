var DoneCriteria = require('../lib/done-criteria')
  , exit = false;

var doneCriteria = new DoneCriteria(
    {
        'eat': [
            ['get ingredients', 'cook']
          , function(name) { console.log('%s is done', name); }
        ]
      , 'clean up': [
            ['put dishes into sink', 'wash them']
          , function(name) { console.log('%s is done', name); }
        ]
    }
  , function() {
      console.log('all done!');
      exit = true;
    }
);

setTimeout(function() { doneCriteria.done('eat', 'cook'); }, 200);
setTimeout(function() { doneCriteria.done('eat', 'get ingredients'); }, 600);

setTimeout(function() { doneCriteria.done('clean up', 'put dishes into sink'); }, 400);
setTimeout(function() { doneCriteria.done('clean up', 'wash them'); }, 1000);

var loop = function() {
  if (exit) {
    process.exit(0);
  } else {
    console.log('not done yet...');
    setTimeout(loop, 500);
  }
};
loop();
