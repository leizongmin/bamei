# 简易 Node.js 开发框架

## 目录结构

```
.
├── examples (示例项目)
├── generator (项目代码生成器)
├── modules (支持的模块列表)
├── node_modules (所有模块的软链接，用于本地开发调试)
├── scaffolding (脚手架项目)
└── tools (开发辅助工具)
```

## 示例项目

用于演示`bamei`框架的使用方法。

[详细文档](https://github.com/leizongmin/bamei/tree/master/examples)

## 脚手架项目（快速入门）

[详细文档](https://github.com/leizongmin/bamei/tree/master/scaffolding)

## 项目代码生成器

[详细文档](https://github.com/leizongmin/bamei/tree/master/generator)

## 支持的模块列表

[详细文档](https://github.com/leizongmin/bamei/tree/master/modules)

## 开发辅助工具

执行`$ node tools`启动开发辅助工具，选择相应的菜单：

```
? 选择要执行的命令 (Use arrow keys)
❯ 创建新的模块
  更新模块文档
  更新模块版本号
  发布所有模块
  退出 ^C
```

### 1、创建新的模块

用于创建一个新的`bamei-module-*`模块，假如要创建模块为`bamei-module-my-abc`，则在模块名称中输入
`my-abc`，并按回车，此时会创建目录`./modules/my-abc`并生成了默认的项目文件。

此时可编辑该目录下的文件`index.js`，模块文件的内容如下：

```javascript
const fs = require('fs');
const path = require('path');

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 默认配置
  }, config);
};

// 初始化
exports.init = function initMyAbcModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').info('initMyAbcModule config: %j', config);

  const client = { message: 'hello, world' };

  Object.assign(ref, { $ns: 'my-abc', client });

  done();

};
```

说明：

+ `dependencies`依赖模块指的是当前模块在初始化时需要先初始化另外一个模块。
  比如`express-session`模块只有在`express`模块初始化后才有用，此时就可以将记录为`{ 'express': '*' }`。
  当用户在使用`this.module('express-session')`初始化该模块时，如果之前的程序没有`this.module('express')`
  则会给用户相应的提示
+ `config`用于填充初始化时需要的配置的默认值，可直接在`Object.assign()`内填写，可参考其他模块的格式
+ `init`为初始化函数，比如在上例中执行`const client = { message: 'hello, world' };`创建了一个`client`对象，
  然后在后面使用`Object.assign(ref, { $ns: 'my-abc', client });`将其设置到`ref`变量上，之后用户可以通过
  `this.get('my-abc.client')`得到该对象

### 2、更新模块文档

执行该命令后会根据各个模块的代码自动更新其`README.md`文件。

### 3、更新模块版本号

根据`scaffolding`项目的版本号，自动统一更新`modules`目录下各个模块的版本号。

### 4、发布所有模块

自动发布`scaffolding`和`modules`目录下的所有模块到 NPM 上。

**为避免混乱，只能由本项目的管理员操作。**


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
