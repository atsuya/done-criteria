var async = require('async');

function DoneCriteria(criteria, callback) {
  this.criteria = criteria.slice();
  this.callback = callback;
}

DoneCriteria.prototype.done = function(criterion) {
  this.remove(criterion);
  if (this.criteria.length === 0) {
    return this.callback(null);
  }
};

DoneCriteria.prototype.remove = function(criterion) {
  var index = this.criteria.indexOf(criterion);
  if (index >= 0) {
    this.criteria = this.criteria.filter(function(element, elementIndex) {
      return elementIndex !== index;
    });
  }
};

/*
 * TODO: add callback when given criteria are done
 */

module.exports = DoneCriteria;
