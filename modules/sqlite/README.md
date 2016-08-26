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
    filename: ':memory:',
    // 打开模式
    mode: 'READWRITE|CREATE',
    // 其他参考 sqlite3 模块
  }, config);
}
```

## 初始化

```javascript
module.exports = require('bamei').create(function (ctx) {
  
  // 使用 ctx.config.get('sqlite') 的配置初始化
  ctx.module('sqlite');
  // 或者
  // 自定义配置初始化
  const options = {};
  ctx.module('sqlite', options);
});
```



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
