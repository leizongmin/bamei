[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-mysql.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-mysql
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-mysql.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-mysql

# bamei-module-mysql

mysql 客户端

## 安装

```bash
$ npm install bamei-module-mysql --save
```

## 依赖模块

无


## 配置说明

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    // 主机地址
    host: '127.0.0.1',
    // 端口号
    port: 3306,
    // 用户
    user: '',
    // 密码
    password: '',
    // 数据库
    database: '',
    // 连接池大小
    connectionLimit: 5,
    // 其他参考 mysql 模块
  }, config);
}
```

## 初始化

```javascript
module.exports = require('bamei').create(function (ctx) {
  
  // 使用 ctx.config.get('mysql') 的配置初始化
  ctx.module('mysql');
  // 或者
  // 自定义配置初始化
  const options = {};
  ctx.module('mysql', options);
});
```

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


## License

```
MIT License

Copyright (c) 2016 Zongmin Lei <leizongmin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
