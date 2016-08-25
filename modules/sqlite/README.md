# bamei-module-sqlite

bamei-module-sqlite

## 安装

```bash
$ npm install bamei-module-sqlite --save
```

## 依赖模块

无


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    filename: &#39;:memory:&#39;,
    mode: &#39;READWRITE|CREATE&#39;,
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
