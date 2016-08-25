# bamei-module-mysql

bamei-module-mysql

## 安装

```bash
$ npm install bamei-module-mysql --save
```

## 依赖模块

无


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    host: &#39;127.0.0.1&#39;,
    port: 3306,
    user: &#39;&#39;,
    password: &#39;&#39;,
    database: &#39;&#39;,
    connectionLimit: 5,
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('mysql') 的配置初始化
this.module('mysql');
// 或者
// 自定义配置初始化
const options = {};
this.module('mysql', options);
```

## License

**The MIT License**
