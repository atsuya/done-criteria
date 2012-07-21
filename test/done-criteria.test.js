var helper = require('./support/helper')
  , DoneCriteria = require('../lib/done-criteria');

describe('done-criteria', function() {
  it('calls callback when all criteria are done', function(done) {
    var doneCriteria = new DoneCriteria(['unko', 'geri'], done);
    doneCriteria.done('unko');
    doneCriteria.done('geri');
  });

  it('calls callback when specified partial criteria are done', function(done) {
    var getIngredients = function(name) {
      name.should.eql('get ingredients');
    };
    var cook = function(name) {
      name.should.eql('cook');
    };
    var doneCriteria = new DoneCriteria(
        {
            'get ingredients': [['egg', 'flour', 'milk'], getIngredients]
          , 'cook': [['some step', 'that i dont know'], cook]
        }
      , done
    );

    doneCriteria.done('get ingredients', 'egg');
    doneCriteria.done('cook', 'that i dont know');
    doneCriteria.done('get ingredients', 'milk');
    doneCriteria.done('get ingredients', 'flour');
    doneCriteria.done('cook', 'some step');
  });
});
