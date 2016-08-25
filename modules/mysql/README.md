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
    host: &#39;127.0.0.1&#39;,
    // 端口号
    port: 3306,
    // 用户
    user: &#39;&#39;,
    // 密码
    password: &#39;&#39;,
    // 数据库
    database: &#39;&#39;,
    // 连接池大小
    connectionLimit: 5,
    // 其他参考 mysql 模块
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('mysql') 的配置初始化
this.module('mysql');
// 或者
// 自定义配置初始化
const options = {};
this.module('mysql', options);
```

## License

**The MIT License**
