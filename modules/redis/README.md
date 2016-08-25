[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-redis.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-redis
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-redis.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-redis

# bamei-module-redis

redis 客户端

## 安装

```bash
$ npm install bamei-module-redis --save
```

## 依赖模块

无


## 配置说明

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    // 服务器地址
    host: &#39;127.0.0.1&#39;,
    // 服务器端口
    port: 6379,
    // 数据库号
    db: 0,
    // 其他参考 redis 模块
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('redis') 的配置初始化
this.module('redis');
// 或者
// 自定义配置初始化
const options = {};
this.module('redis', options);
```

## License

**The MIT License**
