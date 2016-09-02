/**
 * lei-utils build docs
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var utils = require('./');


function getFunctionArguments (fn) {
  return fn.toString().split('\n')[0].match(/function\s*\((.*)\)\s*\{/)[1].split(',').map(function (a) { return a.trim(); });
}

var list = [];
for (var i in utils) {
  if (typeof utils[i] === 'function') {
    list.push('+ `' + i + ' (' + getFunctionArguments(utils[i]).join(', ') + ')`');
  } else {
    list.push('+ `' + i + '`');
    for (var j in utils[i]) {
      if (typeof utils[i][j] === 'function') {
        list.push('  + `' + j + ' (' + getFunctionArguments(utils[i][j]).join(', ') + ')`');
      }
    }
  }
}

var README_FILE = path.resolve(__dirname, 'README.md');
var README_FILE_TPL = path.resolve(__dirname, 'README.tpl.md');
var tpl = fs.readFileSync(README_FILE_TPL).toString();
fs.writeFileSync(README_FILE, tpl.replace(/\{\{EXPORTS\}\}/g, list.join('\n')));

console.log(list.join('\n'));
console.log('done.');
