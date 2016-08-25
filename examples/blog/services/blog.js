'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function () {

  // 当前项目对象
  const $p = this;
  // mysql 客户端
  const mysql = $p.get('mysql.client');

  $p.set('service.blog.getList', blogGetList);

  // 取博客列表
  function blogGetList(query, callback) {
    // eslint-disable-next-line
    query = Object.assign({
      offset: 0,
      limit: $p.config.get('site.pageSize'),
    }, query);
    mysql.query('SELECT * FROM `blog` WHERE `is_show`=1 LIMIT ?,?', [ query.offset, query.limit ], callback);
  }

};
