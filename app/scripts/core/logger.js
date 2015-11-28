/**
 *  Show or hide comments and console logs.
 *  @param {String} log
 *  @constructor
 */
Pokemon.logger = function(log) {
  if (Pokemon.DEBUG) {
    console.log(log);
  }
};
