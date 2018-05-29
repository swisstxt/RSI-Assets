'use strict';

// Handlebars utility for iterations

module.exports = function(index_count, mod, block) {
  if ((parseInt(index_count) + 1) % (mod)=== 0) {
    return block.fn(this);
  }
}