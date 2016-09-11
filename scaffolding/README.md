# bamei

bamei 脚手架

## 简单例子

```javascript
'use strict';

module.exports = require('bamei').create(function (ctx) {

  // 初始化模块
  ctx.module('express');
  ctx.module('express-session-redis');
  ctx.module('express-engine-nunjucks');
  ctx.module('mysql');
  ctx.module('redis');

  // 载入初始化的文件或目录（如果是目录则表示其下的所有文件，包括子目录）
  ctx.task('./models');
  ctx.task('./init/counter.js');

  // 开始执行初始化
  ctx.init(err => {
    if (err) throw err;

    // 开启全局错误捕获
    ctx.catchError();

    console.log(ctx.config.all());
    ctx.getLogger('init').info('server started');
  });
});
```

## License

```
MIT License

Copyright (c) 2016 Zongmin Lei <leizongmin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
