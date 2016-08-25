# bamei-module-express

module-express

## 安装

```bash
$ npm install bamei-module-express --save
```

## 依赖模块

无


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    listen: true,
    port: 3000,
    hostname: &#39;0.0.0.0&#39;,
    logLevel: &#39;INFO&#39;,
    publicPrefix: &#39;/public&#39;,
    publicDir: &#39;./public&#39;,
    compression: {},
    json: {},
    urlencoded: { extended: false },
    multiparty: {},
    cookie: { secret: &#39;hrob8oorrafke11m&#39; },
    validator: {},
    favicon: false,
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
