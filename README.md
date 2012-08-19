done-criteria
=============

[![Build
Status](https://secure.travis-ci.org/atsuya/done-criteria.png)](http://travis-ci.org/atsuya/done-criteria)

Easy to use ``async.whilst`` like utility.


install
========
```
$ npm install done-criteria
```


examples
========

unnamed
-------

```
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
```

This code results in:

```
$ node examples/unnamed.js 
not done yet...
not done yet...
not done yet...
not done yet...
all done!
```

named
-----

```
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
```

This code will result in:

```
$ node examples/named.js 
not done yet...
not done yet...
eat is done
clean up is done
all done!
```


License
========

MIT
