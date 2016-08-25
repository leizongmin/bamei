'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');

exports.replaceRealPath = function (text) {
  return `${ text }\n`
          .replace(new RegExp(`${ __dirname }${ path.sep }`, 'g'), `.${ path.sep }`)
          .replace(/\s*at [^.].*\n/g, '\n')
          .replace(/\n+/g, '\n')
          .trim();
};
