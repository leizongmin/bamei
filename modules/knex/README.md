# bamei-module-knex

module-knex

## 安装

```bash
$ npm install bamei-module-knex --save
```

## 依赖模块

无


## 配置

```javascript
function fillDefaultConfig(config) {
  return Object.assign({
    connection: {},
    pool: { min: 0, max: 5 },
  }, config);
}
```

## 初始化

```javascript

// 使用 this.config.get('knex') 的配置初始化
this.module('knex');
// 或者
// 自定义配置初始化
const options = {};
this.module('knex', options);
```

## License

**The MIT License**
