'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = exports = require('lei-utils').extend();
const path = require('path');

exports.replaceRealPath = function (text) {
  return `${ text }\n`
          .replace(new RegExp(`${ __dirname }${ path.sep }`, 'g'), `::app::.${ path.sep }`)
          .split('\n')
          .filter(line => /::app::/.test(line))
          .join('\n')
          .replace(/::app::/g, '');
};
