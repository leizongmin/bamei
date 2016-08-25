[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-express.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-express
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-express.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-express

# bamei-module-express

express 框架支持

## 安装

```bash
$ npm install bamei-module-express --save
```

## 依赖模块

无


## 配置说明

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    // 开始监听端口
    listen: true,
    // 监听的端口
    port: 3000,
    // 监听的地址
    hostname: &#39;0.0.0.0&#39;,
    // http访问日志等级
    logLevel: &#39;INFO&#39;,
    // 静态资源文件路径前缀
    publicPrefix: &#39;/public&#39;,
    // 静态资源文件目录
    publicDir: &#39;./public&#39;,
    // compression 中间件的配置，false 表示关闭
    compression: {},
    // json 中间件的配置，false 表示关闭
    json: {},
    // urlencoded urlencoded 中间件的配置，false 表示关闭
    urlencoded: { extended: false },
    // multiparty 中间件的配置，false 表示关闭
    multiparty: {},
    // cookie 中间件的配置，false 表示关闭
    cookie: { secret: &#39;hrob8oorrafke11m&#39; },
    // validator 中间件的配置
    validator: {},
    // favicon文件名，false 表示关闭
    favicon: false,
    // 模板目录
    viewsDir: &#39;./views&#39;,
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('express') 的配置初始化
this.module('express');
// 或者
// 自定义配置初始化
const options = {};
this.module('express', options);
```

## License

**The MIT License**
