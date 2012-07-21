function CriteriaHandler() {
}

CriteriaHandler.prototype.done = function() {
  throw new Error('Not implemented');
};

CriteriaHandler.prototype.areAllDone = function() {
  throw new Error('Not Implemented');
};

module.exports = CriteriaHandler;
