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

## 配置

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
