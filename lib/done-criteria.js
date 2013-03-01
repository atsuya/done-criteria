var util = require('util');

var CriteriaHandlerUnnamed = require('./criteria-handler-unnamed')
  , CriteriaHandlerNamed = require('./criteria-handler-named')
  , CriteriaHandlerCount = require('./criteria-handler-count');

function DoneCriteria(criteria, callback) {
  this.callback = callback;

  if (typeof arguments[0] === 'number') {
    this.handler = new CriteriaHandlerCount(arguments[0]);
  } else {
    this.handler = util.isArray(arguments[0]) ?
      new CriteriaHandlerUnnamed(arguments[0]) :
      new CriteriaHandlerNamed(arguments[0]);
  }

  this.checkAllDone();
}

DoneCriteria.prototype.done = function() {
  this.handler.done(arguments[0], (arguments.length > 1 ? arguments[1] : undefined));
  this.checkAllDone();
};

DoneCriteria.prototype.error = function(error) {
  var self = this;
  process.nextTick(function() { self.callback(error); });
};

DoneCriteria.prototype.checkAllDone = function() {
  var self = this;
  if (this.handler.areAllDone()) {
    process.nextTick(function() { self.callback(); });
  }
};

module.exports = DoneCriteria;
