## 模块列表

模块名 | 版本 | 说明
------|-----|-----
<% for (const item of modules) {
  item.url = `https://github.com/leizongmin/bamei/tree/master/modules/${ item.name.slice(13) }`;
%>**[<%= item.name %>](<%= item.url %>)** | <%= item.version %> | <%= item.description %>
<% } %>
