[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/bamei-module-express-engine-nunjucks.svg?style=flat-square
[npm-url]: https://npmjs.org/package/bamei-module-express-engine-nunjucks
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/bamei-module-express-engine-nunjucks.svg?style=flat-square
[download-url]: https://npmjs.org/package/bamei-module-express-engine-nunjucks

# bamei-module-express-engine-nunjucks

express 框架使用 nunjucks 模板引擎

## 安装

```bash
$ npm install bamei-module-express-engine-nunjucks --save
```

## 依赖模块

+ **bamei-module-express**@`*`


## 配置说明

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    // 自动转义输出的变量
    autoescape: true,
    // 监听文件变化，有更新时自动重载
    watch: true,
    // 当变量是undefined时抛出异常
    throwOnUndefined: false,
    // 删除标签空行
    trimBlocks: false,
    // 删除标签左边的空格
    lstripBlocks: false,
    // 不使用缓存
    noCache: true,
    // 模板引擎目录
    viewsDir: this.get(&#39;express.app&#39;).get(&#39;views&#39;),
    // express实例
    express: this.get(&#39;express.app&#39;),
    // 其他参考 nunjucks 模块
  }, config);
}
```

## 初始化

```javascript
// 先初始化依赖的模块
this.module('express');

// 使用 this.config.get('express-engine-nunjucks') 的配置初始化
this.module('express-engine-nunjucks');
// 或者
// 自定义配置初始化
const options = {};
this.module('express-engine-nunjucks', options);
```

## License

**The MIT License**
