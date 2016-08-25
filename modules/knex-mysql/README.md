[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-knex-mysql.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-knex-mysql
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-knex-mysql.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-knex-mysql

# bamei-module-knex-mysql

knex 支持，使用 mysql 存储

## 安装

```bash
$ npm install bamei-module-knex-mysql --save
```

## 依赖模块

无


## 配置说明

```javascript
function fillDefaultConfig(config) {
  // 参考 bamei-module-knex 模块
  return config;
}
```

## 初始化

```javascript

// 使用 this.config.get('knex-mysql') 的配置初始化
this.module('knex-mysql');
// 或者
// 自定义配置初始化
const options = {};
this.module('knex-mysql', options);
```

## License

**The MIT License**
