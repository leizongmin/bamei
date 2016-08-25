[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/<%= name %>.svg?style=flat-square
[npm-url]: https://npmjs.org/package/<%= name %>
[david-image]: https://img.shields.io/david/leizongmin/bamei.svg?style=flat-square
[david-url]: https://david-dm.org/leizongmin/bamei
[node-image]: https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/<%= name %>.svg?style=flat-square
[download-url]: https://npmjs.org/package/<%= name %>

# <%= name %>

<%= description %>

## 安装

```bash
$ npm install <%= name %> --save
```

## 依赖模块
<% if (dependencies.length > 0) { %>
<% for (const item of dependencies) { %>+ **<%= item.name %>**@`<%= item.version %>`<% } %>
<% } else { %>
无
<% } %>

## 配置说明

```javascript
<%= config.toString() %>
```

## 初始化

```javascript
<% if (dependencies.length > 0) { %>// 先初始化依赖的模块
<% for (const item of dependencies) { %>this.module('<%= item.shortName %>');<% } %>
<% } %>
// 使用 this.config.get('<%= shortName %>') 的配置初始化
this.module('<%= shortName %>');
// 或者
// 自定义配置初始化
const options = {};
this.module('<%= shortName %>', options);
```

## License

**The MIT License**
