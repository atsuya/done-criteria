var util = require('util')
  , underscore = require('underscore');

var CriteriaHandler = require('./criteria-handler');

function CriteriaHandlerNamed(criteria) {
  this.criteria = underscore.extend({}, criteria);
}

util.inherits(CriteriaHandlerNamed, CriteriaHandler);

CriteriaHandlerNamed.prototype.done = function(name, criterion) {
  this.remove(name, criterion);

  var target = this.getCriteria(name);
  if (target && target.length === 0) {
    return this.criteria[name][1](name);
  }
};

CriteriaHandlerNamed.prototype.areAllDone = function() {
  var result = underscore.reduce(this.criteria, function(memo, value) {
    return memo + value[0].length;
  }, 0);
  return result === 0;
};

CriteriaHandlerNamed.prototype.remove = function(name, criterion) {
  var target = this.getCriteria(name);
  if (target) {
    var index = target.indexOf(criterion);
    if (index >= 0) {
      this.criteria[name][0] = target.filter(function(element, elementIndex) {
        return elementIndex !== index;
      });
    }
  }
};

CriteriaHandlerNamed.prototype.getCriteria = function(name) {
  return this.criteria.hasOwnProperty(name) ? this.criteria[name][0] : null;
};

module.exports = CriteriaHandlerNamed;
