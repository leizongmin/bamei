# bamei-module-knex-mysql

module-knex-mysql

## 安装

```bash
$ npm install bamei-module-knex-mysql --save
```

## 依赖模块

无


## 配置

```javascript
function fillDefaultConfig(config) {
  return config;
}
```

## 初始化

```javascript

// 使用 this.config.get('knex-mysql') 的配置初始化
this.module('knex-mysql');
// 或者
// 自定义配置初始化
const options = {};
this.module('knex-mysql', options);
```

## License

**The MIT License**
