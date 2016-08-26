'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
const moment = require('moment');
moment.locale('zh-cn');

module.exports = function (ctx) {

  const env = ctx.get('express-engine-nunjucks.env');

  env.addFilter('markdown', filterMarkdown);
  env.addFilter('moment', filterMoment);

  function filterMarkdown(text) {
    if (!text) return '';
    return md.render(String(text));
  }

  function filterMoment(time, format) {
    return moment(time).format(format);
  }

};
