/**
 * lei-utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var util = require('util');
var events = require('events');
var crypto = require('crypto');
var utils = exports;


var BUG_FREE = require('./bugfree');

/**
 * 佛祖保佑，用无Bug
 * 图像来源于 https://github.com/ottomao/bugfreejs
 *
 * @param {Boolean} doNotOutput 设置为true时不自动打印，仅返回字符串
 */
exports.bugfree = function (doNotOutput) {
  if (doNotOutput) {
    return BUG_FREE;
  } else {
    console.log(BUG_FREE);
  }
};

/**
 * 40位SHA1值
 *
 * @param {string} text 文本
 * @return {string}
 */
exports.sha1 = function (text) {
  if (!Buffer.isBuffer(text)) text = new Buffer(text);
  return crypto.createHash('sha1').update(text).digest('hex');
};

/**
 * 32位MD5值
 *
 * @param {string} text 文本
 * @return {string}
 */
exports.md5 = function (text) {
  if (!Buffer.isBuffer(text)) text = new Buffer(text);
  return crypto.createHash('md5').update(text).digest('hex');
};

/**
 * 取文件内容的SHA1
 *
 * @param {String} filename
 * @return {Function} callback
 */
exports.fileSha1 = function (filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) return callback(err);
    callback(null, utils.sha1(data));
  });
};

/**
 * 取文件内容的MD5
 *
 * @param {String} filename
 * @return {Function} callback
 */
exports.fileMd5 = function (filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) return callback(err);
    callback(null, utils.md5(data));
  });
};

/**
 * 加密密码
 *
 * @param {string} password
 * @return {string}
 */
exports.encryptPassword = function (password) {
  var random = utils.md5(Math.random() + '' + Math.random()).toUpperCase();
  var left = random.substr(0, 2);
  var right = random.substr(-2);
  var newpassword = utils.md5(left + password + right).toUpperCase();
  return [left, newpassword, right].join(':');
};

/**
 * 验证密码
 *
 * @param {string} password 待验证的密码
 * @param {string} encrypted 密码加密字符串
 * @return {bool}
 */
exports.validatePassword = function (password, encrypted) {
  var random = encrypted.toUpperCase().split(':');
  if (random.length < 3) return false;
  var left = random[0];
  var right = random[2];
  var main = random[1];
  var newpassword = utils.md5(left + password + right).toUpperCase();
  return newpassword === main;
};

/**
 * 加密信息
 *
 * @param {Mixed} data
 * @param {String} secret
 * @return {String}
 */
exports.encryptData = function (data, secret) {
  var str = JSON.stringify(data);
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

/**
 * 解密信息
 *
 * @param {String} str
 * @param {String} secret
 * @return {Mixed}
 */
exports.decryptData = function (str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  var data = JSON.parse(dec);
  return data;
};

/**
 * 产生随机字符串
 *
 * @param {Integer} size
 * @param {String} chars
 * @return {String}
 */
exports.randomString = function (size, chars) {
  size = size || 6;
  chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max = chars.length;
  var ret = '';
  for (var i = 0; i < size; i++) {
    ret += chars.charAt(Math.floor(Math.random() * max));
  }
  return ret;
};

/**
 * 产生随机数字字符串
 *
 * @param {Integer} size
 * @return {String}
 */
exports.randomNumber = function (size) {
  return utils.randomString(size, '0123456789');
};

/**
 * 产生随机字母字符串
 *
 * @param {Integer} size
 * @return {String}
 */
exports.randomLetter = function (size) {
  return utils.randomString(size, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
};

/**
 * 格式化日期时间
 *
 * @param {String} format
 * @param {String|Number|Date} timestamp
 * @return {String}
 */
exports.date = function (format, timestamp) {
  //  discuss at: http://phpjs.org/functions/date/
  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // original by: gettimeofday
  //    parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: MeEtc (http://yass.meetcweb.com)
  // improved by: Brad Touesnard
  // improved by: Tim Wiel
  // improved by: Bryan Elliott
  // improved by: David Randall
  // improved by: Theriault
  // improved by: Theriault
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault
  // improved by: Thomas Beaucourt (http://www.webapp.fr)
  // improved by: JT
  // improved by: Theriault
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  // improved by: Theriault
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: majak
  //    input by: Alex
  //    input by: Martin
  //    input by: Alex Wilson
  //    input by: Haravikk
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: majak
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
  // bugfixed by: Chris (http://www.devotis.nl/)
  //        note: Uses global: php_js to store the default timezone
  //        note: Although the function potentially allows timezone info (see notes), it currently does not set
  //        note: per a timezone specified by date_default_timezone_set(). Implementers might use
  //        note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
  //        note: in order to adjust the dates in this function (or our other date functions!) accordingly
  //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
  //   returns 1: '09:09:40 m is month'
  //   example 2: date('F j, Y, g:i a', 1062462400);
  //   returns 2: 'September 2, 2003, 2:26 am'
  //   example 3: date('Y W o', 1062462400);
  //   returns 3: '2003 36 2003'
  //   example 4: x = date('Y m d', (new Date()).getTime()/1000);
  //   example 4: (x+'').length == 10 // 2009 01 09
  //   returns 4: true
  //   example 5: date('W', 1104534000);
  //   returns 5: '53'
  //   example 6: date('B t', 1104534000);
  //   returns 6: '999 31'
  //   example 7: date('W U', 1293750000.82); // 2010-12-31
  //   returns 7: '52 1293750000'
  //   example 8: date('W', 1293836400); // 2011-01-01
  //   returns 8: '52'
  //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
  //   returns 9: '52 2011-01-02'

  var that = this;
  var jsdate, f;
  // Keep this here (works, but for code commented-out below for file size reasons)
  // var tal= [];
  var txt_words = [
    'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // trailing backslash -> (dropped)
  // a backslash followed by any character (including backslash) -> the character
  // empty string -> empty string
  var formatChr = /\\?(.?)/gi;
  var formatChrCb = function(t, s) {
    return f[t] ? f[t]() : s;
  };
  var _pad = function(n, c) {
    n = String(n);
    while (n.length < c) {
      n = '0' + n;
    }
    return n;
  };
  f = {
    // Day
    d: function() { // Day of month w/leading 0; 01..31
      return _pad(f.j(), 2);
    },
    D: function() { // Shorthand day name; Mon...Sun
      return f.l()
        .slice(0, 3);
    },
    j: function() { // Day of month; 1..31
      return jsdate.getDate();
    },
    l: function() { // Full day name; Monday...Sunday
      return txt_words[f.w()] + 'day';
    },
    N: function() { // ISO-8601 day of week; 1[Mon]..7[Sun]
      return f.w() || 7;
    },
    S: function() { // Ordinal suffix for day of month; st, nd, rd, th
      var j = f.j();
      var i = j % 10;
      if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
        i = 0;
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th';
    },
    w: function() { // Day of week; 0[Sun]..6[Sat]
      return jsdate.getDay();
    },
    z: function() { // Day of year; 0..365
      var a = new Date(f.Y(), f.n() - 1, f.j());
      var b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5);
    },

    // Week
    W: function() { // ISO-8601 week number
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
      var b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
    },

    // Month
    F: function() { // Full month name; January...December
      return txt_words[6 + f.n()];
    },
    m: function() { // Month w/leading 0; 01...12
      return _pad(f.n(), 2);
    },
    M: function() { // Shorthand month name; Jan...Dec
      return f.F()
        .slice(0, 3);
    },
    n: function() { // Month; 1...12
      return jsdate.getMonth() + 1;
    },
    t: function() { // Days in month; 28...31
      return (new Date(f.Y(), f.n(), 0))
        .getDate();
    },

    // Year
    L: function() { // Is leap year?; 0 or 1
      var j = f.Y();
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
    },
    o: function() { // ISO-8601 year
      var n = f.n();
      var W = f.W();
      var Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
    },
    Y: function() { // Full year; e.g. 1980...2010
      return jsdate.getFullYear();
    },
    y: function() { // Last two digits of year; 00...99
      return f.Y()
        .toString()
        .slice(-2);
    },

    // Time
    a: function() { // am or pm
      return jsdate.getHours() > 11 ? 'pm' : 'am';
    },
    A: function() { // AM or PM
      return f.a()
        .toUpperCase();
    },
    B: function() { // Swatch Internet time; 000..999
      var H = jsdate.getUTCHours() * 36e2;
      // Hours
      var i = jsdate.getUTCMinutes() * 60;
      // Minutes
      var s = jsdate.getUTCSeconds(); // Seconds
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
    },
    g: function() { // 12-Hours; 1..12
      return f.G() % 12 || 12;
    },
    G: function() { // 24-Hours; 0..23
      return jsdate.getHours();
    },
    h: function() { // 12-Hours w/leading 0; 01..12
      return _pad(f.g(), 2);
    },
    H: function() { // 24-Hours w/leading 0; 00..23
      return _pad(f.G(), 2);
    },
    i: function() { // Minutes w/leading 0; 00..59
      return _pad(jsdate.getMinutes(), 2);
    },
    s: function() { // Seconds w/leading 0; 00..59
      return _pad(jsdate.getSeconds(), 2);
    },
    u: function() { // Microseconds; 000000-999000
      return _pad(jsdate.getMilliseconds() * 1000, 6);
    },

    // Timezone
    e: function() { // Timezone identifier; e.g. Atlantic/Azores, ...
      // The following works, but requires inclusion of the very large
      // timezone_abbreviations_list() function.
      /*              return that.date_default_timezone_get();
       */
      throw 'Not supported (see source code of date() for timezone on how to add support)';
    },
    I: function() { // DST observed?; 0 or 1
      // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
      // If they are not equal, then DST is observed.
      var a = new Date(f.Y(), 0);
      // Jan 1
      var c = Date.UTC(f.Y(), 0);
      // Jan 1 UTC
      var b = new Date(f.Y(), 6);
      // Jul 1
      var d = Date.UTC(f.Y(), 6); // Jul 1 UTC
      return ((a - c) !== (b - d)) ? 1 : 0;
    },
    O: function() { // Difference to GMT in hour format; e.g. +0200
      var tzo = jsdate.getTimezoneOffset();
      var a = Math.abs(tzo);
      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
    },
    P: function() { // Difference to GMT w/colon; e.g. +02:00
      var O = f.O();
      return (O.substr(0, 3) + ':' + O.substr(3, 2));
    },
    T: function() { // Timezone abbreviation; e.g. EST, MDT, ...
      // The following works, but requires inclusion of the very
      // large timezone_abbreviations_list() function.
      /*              var abbr, i, os, _default;
      if (!tal.length) {
        tal = that.timezone_abbreviations_list();
      }
      if (that.php_js && that.php_js.default_timezone) {
        _default = that.php_js.default_timezone;
        for (abbr in tal) {
          for (i = 0; i < tal[abbr].length; i++) {
            if (tal[abbr][i].timezone_id === _default) {
              return abbr.toUpperCase();
            }
          }
        }
      }
      for (abbr in tal) {
        for (i = 0; i < tal[abbr].length; i++) {
          os = -jsdate.getTimezoneOffset() * 60;
          if (tal[abbr][i].offset === os) {
            return abbr.toUpperCase();
          }
        }
      }
      */
      return 'UTC';
    },
    Z: function() { // Timezone offset in seconds (-43200...50400)
      return -jsdate.getTimezoneOffset() * 60;
    },

    // Full Date/Time
    c: function() { // ISO-8601 date.
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
    },
    r: function() { // RFC 2822
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
    },
    U: function() { // Seconds since UNIX epoch
      return jsdate / 1000 | 0;
    }
  };
  this.date = function(format, timestamp) {
    that = this;
    jsdate = (timestamp === undefined ? new Date() : // Not provided
      (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
        new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
      );
    return format.replace(formatChr, formatChrCb);
  };
  return this.date(format, timestamp);
};

/**
 * 空白回调函数
 *
 * @param {Error} err
 */
exports.noop = function (err) {
  if (err) {
    console.error('noop callback: %s', err);
  }
};

/**
 * 是否为字符串
 *
 * @param {Mixed} str
 * @return {Boolean}
 */
exports.isString = function (str) {
  return (typeof str === 'string');
};

/**
 * 是否为整数
 *
 * @param {Mixed} str
 * @return {Boolean}
 */
exports.isInteger = function (str) {
  return (Math.round(str) === Number(str));
};

/**
 * 是否为数字
 *
 * @param {Mixed} str
 * @return {Boolean}
 */
exports.isNumber = function (str) {
  return (!isNaN(str));
};

/**
 * 复制对象
 *
 * @param {Object} obj
 * @return {Object}
 */
exports.cloneObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * 合并对象
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
exports.merge = function () {
  var ret = {};
  for (var i = 0; i < arguments.length; i++) {
    var obj = arguments[i];
    Object.keys(obj).forEach(function (k) {
      ret[k] = obj[k];
    });
  }
  return ret;
};

/**
 * 返回安全的JSON字符串
 *
 * @param {Object} data
 * @param {String|Number} space 缩进
 * @return {String}
 */
exports.jsonStringify = function (data, space) {
  var seen = [];
  return JSON.stringify(data, function (key, val) {
    if (!val || typeof val !== 'object') {
      return val;
    }
    if (seen.indexOf(val) !== -1) {
      return '[Circular]';
    }
    seen.push(val);
    return val;
  }, space);
};

/**
 * 将arguments对象转换成数组
 *
 * @param {Object} args
 * @return {Array}
 */
exports.argumentsToArray = function (args) {
  return Array.prototype.slice.call(args);
};

/**
 * 取数组的最后一个元素
 *
 * @param {Array} arr
 * @return {Object}
 */
exports.getArrayLastItem = function (arr) {
  return arr[arr.length - 1];
};

/**
 * 异步函数节流
 *
 * @param {Function} fn
 * @param {Number} maxCcoun
 */
exports.throttleAsync = function (fn, maxCount) {
  if (!(maxCount > 1)) maxCount = 1;
  var counter = 0;
  return function () {
    var args = utils.argumentsToArray(arguments);
    var callback = utils.getArrayLastItem(args);
    if (counter >= maxCount) return callback(new Error('throttleAsync() out of limit'));
    args.pop();
    args.push(function () {
      counter--;
      callback.apply(null, arguments);
    });
    counter++;
    fn.apply(null, args);
  };
};

/**
 * 继承EventEmitter
 *
 * @param {Function} fn
 */
exports.inheritsEventEmitter = function (fn) {
  return util.inherits(fn, events.EventEmitter);
};

/**
 * 继承
 *
 * @param {Function} fn
 * @param {Function} superConstructor
 */
exports.inherits = function (fn, superConstructor) {
  return util.inherits(fn, superConstructor);
};

/**
 * 扩展utils
 *
 * @return {Object}
 */
exports.extend = function () {
  return utils.merge(exports);
};


exports.array = {};

/**
 * 取数组最后一个元素
 *
 * @param {Array} arr
 * @return {Object}
 */
exports.array.last = function (arr) {
  return arr[arr.length - 1];
};

/**
 * 取数组第一个元素
 *
 * @param {Array} arr
 * @return {Object}
 */
exports.array.head = function (arr) {
  return arr[0];
};

/**
 * 取数组第一个元素
 *
 * @param {Array} arr
 * @return {Object}
 */
exports.array.first = function (arr) {
  return arr[0];
};

/**
 * 取数组除第一个之外的元素
 *
 * @param {Array} arr
 * @return {Object}
 */
exports.array.rest = function (arr) {
  return arr.slice(1);
};

/**
 * 复制一个数组
 *
 * @param {Array} arr
 * @return {Object}
 */
exports.array.copy = function (arr) {
  return arr.slice();
};

/**
 * 组合一组数组
 *
 * @param {Array} a
 * @param {Array} b
 * @return {Object}
 */
exports.array.concat = function () {
  var ret = [];
  return ret.concat.apply(ret, arguments);
};

/**
 * 生成自定义Error类型
 *
 * @param {String} name
 * @param {Object} info
 * @return {Function}
 */
exports.customError = function (name, info) {
  name = name || 'CustomError';
  info = info || {};
  var code = '' +
'function ' + name + '(message, info2) {\n' +
'  Error.captureStackTrace(this, ' + name + ');\n' +
'  this.name = "' + name + '";\n' +
'  this.message = (message || "");\n' +
'  info2 = info2 || {};\n' +
'  for (var i in info) this[i] = info[i];\n' +
'  for (var i in info2) this[i] = info2[i];\n' +
'}\n' +
name + '.prototype = Error.prototype;' + name;
  return eval(code);
};

/**
 * 判断是否为Promise对象
 *
 * @param {Object} p
 * @return {Boolean}
 */
exports.isPromise = function (p) {
  return (p && p.then && typeof p.then === 'function' && p.catch && typeof p.catch === 'function');
};

exports.async = {};

exports.promise = {};

/**
 * 调用异步函数（传参时不包含末尾的callback），返回一个Promise对象
 *
 * @param {Function} fn
 * @return {Object}
 */
exports.promise.call = function (fn) {
  var args = utils.argumentsToArray(arguments).slice(1);
  return new Promise(function (resolve, reject) {
    args.push(function (err, ret) {
      if (err) {
        reject(err);
      } else {
        resolve(ret);
      }
    });
    try {
      var ret = fn.apply(null, args);
    } catch (err) {
      return reject(err);
    }
    if (utils.isPromise(ret)) {
      ret.then(resolve).catch(reject);
    }
  });
};

/**
 * 等待所有Promise执行完毕
 *
 * @return {Object}
 */
exports.promise.all = function (_args) {
  var args = Array.isArray(_args) ? _args : utils.argumentsToArray(arguments);
  return new Promise(function (resolve, reject) {
    var results = [];
    var counter = 0;
    function check () {
      counter++;
      if (counter === args.length) {
        resolve(results);
      }
    }
    args.forEach(function (p, i) {
      p.then(function (ret) {
        results[i] = [null, ret];
        check();
      }).catch(function (err) {
        results[i] = [err];
        check();
      });
    });
  });
};
