# bamei-module-express-engine-nunjucks

bamei-module-express-engine-nunjucks

## 安装

```bash
$ npm install bamei-module-express-engine-nunjucks --save
```

## 依赖模块

+ **bamei-module-express**@`*`


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    autoescape: true,
    watch: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    noCache: true,
    viewsDir: this.get(&#39;express.app&#39;).get(&#39;views&#39;),
    express: this.get(&#39;express.app&#39;),
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
