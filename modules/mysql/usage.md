## 使用方法

```javascript
module.exports = function (ctx) {

  // 得到客户端连接实例
  const client = ctx.get('mysql.client');

  // 执行查询
  client.query('SELECT * FROM `user` WHERE `User`=?', [ 'root' ], (err, ret) => {
    if (err) {
      console.error(err);
    } else {
      console.log(ret);
    }
  });

};
```

详细使用方法参考 **mysql** 模块的 [Pooling connections](https://www.npmjs.com/package/mysql#pooling-connections)
