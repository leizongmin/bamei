[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-knex.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-knex
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-knex.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-knex

# bamei-module-knex

knex 支持，不能单独使用

## 安装

```bash
$ npm install bamei-module-knex --save
```

## 依赖模块

无


## 配置说明

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    // 客户端类型：mysql, pg, sqlite3, mssql，必填
    // client: &#39;&#39;,
    // 连接信息，默认 {}
    connection: {},
    // 连接池
    pool: { min: 0, max: 5 },
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('knex') 的配置初始化
this.module('knex');
// 或者
// 自定义配置初始化
const options = {};
this.module('knex', options);
```

## License

**The MIT License**
