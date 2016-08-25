# bamei-module-express-session-memcached

module-express-session-memcached

## 安装

```bash
$ npm install bamei-module-express-session-memcached --save
```

## 依赖模块

+ **bamei-module-express**@`*`


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    resave: true,
    saveUninitialized: true,
    secret: this.getConfigOrDefault(&#39;config.express.cookie.secret&#39;, &#39;&#39;),
    store: { hosts: [ &#39;127.0.0.1:11211&#39; ]},
  }, config);
}
```

## 初始化

```javascript
// 先初始化依赖的模块
this.module('express');

// 使用 this.config.get('express-session-memcached') 的配置初始化
this.module('express-session-memcached');
// 或者
// 自定义配置初始化
const options = {};
this.module('express-session-memcached', options);
```

## License

**The MIT License**
