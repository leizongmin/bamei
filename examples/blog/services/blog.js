'use strict';

/**
 * blog example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ctx) {

  // mysql 客户端
  const mysql = ctx.get('mysql.client');

  ctx.set('service.blog.getList', blogGetList);
  ctx.set('service.blog.getById', blogGetById);
  ctx.set('service.blog.updateById', blogUpdateById);
  ctx.set('service.blog.create', blogCreate);

  // 取博客列表
  function blogGetList(query, callback) {
    // eslint-disable-next-line
    query = Object.assign({
      offset: 0,
      limit: ctx.config.get('site.pageSize'),
    }, query);
    mysql.query('SELECT * FROM `blog` WHERE `is_show`=1  ORDER BY `id` DESC LIMIT ?,?',
    [ query.offset, query.limit ], callback);
  }

  // 取指定 ID 的博客内容
  function blogGetById(id, callback) {
    mysql.query('SELECT * FROM `blog` WHERE `id`=?', [ id ], (err, list) => {
      if (err) return callback(err);
      if (list.length < 1) return callback(null);
      const blog = list[0];
      mysql.query('SELECT * FROM `blog_contents` WHERE `id`=?', [ id ], (err, list) => {
        if (err) return callback(err);
        blog.content = list.length > 0 && list[0].content || '';
        callback(null, blog);
      });
    });
  }

  // 更具指定 ID 更新博客
  function blogUpdateById(id, data, callback) {
    mysql.query('UPDATE `blog` SET `title`=?, `summary`=?, `updated_at`=? WHERE `id`=? LIMIT 1',
    [ data.title, data.summary, data.updated_at, id ], err => {
      if (err) return callback(err);
      mysql.query('UPDATE `blog_contents` SET `content`=? WHERE `id`=?', [ data.content, id ], callback);
    });
  }

  // 发表新文章
  function blogCreate(data, callback) {
    mysql.query('INSERT INTO `blog`(`title`, `summary`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?)',
    [ data.title, data.summary, new Date(), new Date() ], (err, ret) => {
      if (err) return callback(err);
      const id = ret.insertId;
      mysql.query('INSERT INTO `blog_contents`(`id`, `content`) VALUES (?, ?)', [ id, data.content ], err => {
        callback(err, Object.assign({ id }, data));
      });
    });
  }

};
