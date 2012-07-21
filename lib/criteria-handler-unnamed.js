var util = require('util');

var CriteriaHandler = require('./criteria-handler');

function CriteriaHandlerUnnamed(criteria) {
  this.criteria = criteria.slice();
}

util.inherits(CriteriaHandlerUnnamed, CriteriaHandler);

CriteriaHandlerUnnamed.prototype.done = function(criterion) {
  this.remove(criterion);
};

CriteriaHandlerUnnamed.prototype.areAllDone = function() {
  return this.criteria.length === 0;
};

CriteriaHandlerUnnamed.prototype.remove = function(criterion) {
  var index = this.criteria.indexOf(criterion);
  if (index >= 0) {
    this.criteria = this.criteria.filter(function(element, elementIndex) {
      return elementIndex !== index;
    });
  }
};

module.exports = CriteriaHandlerUnnamed;
