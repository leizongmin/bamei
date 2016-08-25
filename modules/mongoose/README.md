# bamei-module-mongoose

bamei-module-mongoose

## 安装

```bash
$ npm install bamei-module-mongoose --save
```

## 依赖模块

无


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    url: &#39;mongodb://localhost/test&#39;,
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('mongoose') 的配置初始化
this.module('mongoose');
// 或者
// 自定义配置初始化
const options = {};
this.module('mongoose', options);
```

## License

**The MIT License**
