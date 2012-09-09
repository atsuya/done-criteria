var util = require('util');

var CriteriaHandler = require('./criteria-handler');

function CriteriaHandlerCount(count) {
  this.count = count;
  this.current = 0;
}

util.inherits(CriteriaHandlerCount, CriteriaHandler);

CriteriaHandlerCount.prototype.done = function() {
  this.current += 1;
};

CriteriaHandlerCount.prototype.areAllDone = function() {
  return this.current === this.count;
};

module.exports = CriteriaHandlerCount;
