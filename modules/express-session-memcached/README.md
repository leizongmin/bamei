[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-express-session-memcached.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-express-session-memcached
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-express-session-memcached.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-express-session-memcached

# bamei-module-express-session-memcached

express 框架的 session 支持，使用 memcached 存储

## 安装

```bash
$ npm install bamei-module-express-session-memcached --save
```

## 依赖模块

+ **bamei-module-express**@`*`


## 配置说明

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    // 参考 express-session 模块
    resave: true,
    // 参考 express-session 模块
    saveUninitialized: true,
    // 安全密钥，参考 express-session 模块
    secret: this.getConfigOrDefault(&#39;config.express.cookie.secret&#39;, &#39;&#39;),
    // 存储引擎，参考 connect-memcached 模块
    store: { hosts: [ &#39;127.0.0.1:11211&#39; ]},
  }, config);
}
```

## 初始化

```javascript
// 先初始化依赖的模块
this.module('express');

// 使用 this.config.get('express-session-memcached') 的配置初始化
this.module('express-session-memcached');
// 或者
// 自定义配置初始化
const options = {};
this.module('express-session-memcached', options);
```

## License

**The MIT License**
