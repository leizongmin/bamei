# bamei-module-redis

bamei-module-redis

## 安装

```bash
$ npm install bamei-module-redis --save
```

## 依赖模块

无


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    host: &#39;127.0.0.1&#39;,
    port: 6379,
    db: 0,
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
