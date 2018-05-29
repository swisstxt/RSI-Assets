'use strict';

// Handlebars utility for iterations

module.exports = function(idx, idxNum, block) {
	if (idx + 1 === idxNum) {
	  return block.fn(this);
	} else {
	 return block.inverse(this);
	}
}