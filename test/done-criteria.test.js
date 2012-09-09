var helper = require('./support/helper')
  , DoneCriteria = require('../lib/done-criteria');

describe('done-criteria', function() {
  var error = function() { throw new Error('Callback is called'); };

  describe('with count criteria', function() {
    it('calls callback when all criteria are done', function(done) {
      var doneCriteria = new DoneCriteria(3, done);
      doneCriteria.done();
      doneCriteria.done();
      doneCriteria.done();
    });
    
    it('does not call callback when criteria are not done', function(done) {
      var doneCriteria = new DoneCriteria(3, error);
      doneCriteria.done();
      doneCriteria.done();

      setTimeout(function() { done(); }, 1500);
    });
  });

  describe('with unnamed criteria', function() {
    it('calls callback when all criteria are done', function(done) {
      var doneCriteria = new DoneCriteria(['unko', 'geri'], done);
      doneCriteria.done('unko');
      doneCriteria.done('geri');
    });
    
    it('does not call callback when criteria are not done', function(done) {
      var doneCriteria = new DoneCriteria(['unko', 'geri'], error);
      doneCriteria.done('unko');
      doneCriteria.done('shikko');

      setTimeout(function() { done(); }, 1500);
    });
  });

  describe('with named criteria', function() {
    it('calls callback when all criteria are done', function(done) {
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

    it('does not call when criteria are not done', function(done) {
      var getIngredients = function(name) {
        name.should.eql('get ingredients');
      };
      var cook = function(name) {
        throw new Error('Callback is called');
      };
      var doneCriteria = new DoneCriteria(
          {
              'get ingredients': [['egg', 'flour', 'milk'], getIngredients]
            , 'cook': [['some step', 'that i dont know'], cook]
          }
        , error
      );

      doneCriteria.done('get ingredients', 'egg');
      doneCriteria.done('cook', 'that i dont know');
      doneCriteria.done('get ingredients', 'milk');
      doneCriteria.done('get ingredients', 'flour');
      
      setTimeout(function() { done(); }, 1500);
    });
  });
});
