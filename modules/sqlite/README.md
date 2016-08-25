[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-sqlite.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-sqlite
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-sqlite.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-sqlite

# bamei-module-sqlite

sqlite3 客户端

## 安装

```bash
$ npm install bamei-module-sqlite --save
```

## 依赖模块

无


## 配置说明

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    // 文件名
    filename: &#39;:memory:&#39;,
    // 打开模式
    mode: &#39;READWRITE|CREATE&#39;,
    // 其他参考 sqlite3 模块
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('sqlite') 的配置初始化
this.module('sqlite');
// 或者
// 自定义配置初始化
const options = {};
this.module('sqlite', options);
```

## License

**The MIT License**
