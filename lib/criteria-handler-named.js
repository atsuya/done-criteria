var util = require('util')
  , underscore = require('underscore');

var CriteriaHandler = require('./criteria-handler');

function CriteriaHandlerNamed(criteria) {
  this.criteria = underscore.extend({}, criteria);
}

util.inherits(CriteriaHandlerNamed, CriteriaHandler);

//CriteriaHandlerNamed.prototype.done = function(criterion) {
//  this.remove(criterion);
//};

//CriteriaHandlerNamed.prototype.areAllDone = function() {
//  return this.criteria.length === 0;
//};

//CriteriaHandlerNamed.prototype.remove = function(criterion) {
//  var index = this.criteria.indexOf(criterion);
//  if (index >= 0) {
//    this.criteria = this.criteria.filter(function(element, elementIndex) {
//      return elementIndex !== index;
//    });
//  }
//};

module.exports = CriteriaHandlerNamed;
