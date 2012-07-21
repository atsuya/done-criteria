var util = require('util');

var CriteriaHandlerUnnamed = require('./criteria-handler-unnamed')
  , CriteriaHandlerNamed = require('./criteria-handler-named');

function DoneCriteria(criteria, callback) {
  this.callback = callback;
  this.handler = util.isArray(arguments[0]) ?
    new CriteriaHandlerUnnamed(arguments[0]) :
    new CriteriaHandlerNamed(arguments[0]);
}

DoneCriteria.prototype.done = function() {
  this.handler.done(arguments[0], (arguments.length > 1 ? arguments[1] : undefined));
  if (this.handler.areAllDone()) {
    return this.callback();
  }
};

module.exports = DoneCriteria;