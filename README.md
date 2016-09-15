# 简易 Node.js 开发框架

**本项目需要在 Node.js v6.0 或更高版本上运行**

## Why

为什么要开发这个项目呢？

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

+ 示例项目 - 用于演示`bamei`框架的使用方法 - [详细文档](https://github.com/leizongmin/bamei/tree/master/examples)
  + [最简单的 hello world 例子](https://github.com/leizongmin/bamei/tree/master/examples/tiny)
  + [一个简单的个人博客系统](https://github.com/leizongmin/bamei/tree/master/examples/blog)
  + [async/await 例子](https://github.com/leizongmin/bamei/tree/master/examples/async-await)
+ 脚手架项目（快速入门）- [详细文档](https://github.com/leizongmin/bamei/tree/master/scaffolding)
+ 项目代码生成器 - [详细文档](https://github.com/leizongmin/bamei/tree/master/generator)
+ 支持的模块列表 - [详细文档](https://github.com/leizongmin/bamei/tree/master/modules)
+ 开发辅助工具 - [详细文档](https://github.com/leizongmin/bamei/tree/master/tools)

## 如何成为贡献者

**bamei**是一个自由、开放的 Node.js 开发框架，任何人都可以在其之上构建适用于自己项目的模块。
如果您希望在**bamei**中加入自己的修改，欢迎提交**pull request**或者**issue**。

为了维护项目的整体规范，在提交代码前需要注意以下几点：

+ 所有代码必须通过**eslint**检查（使用配置`eslint-config-lei`，不能有任何`error`级别的报告项）
+ 对已有接口的修改需要**先提交issue**讨论确定后再提交pull request
+ 使用**开发辅助工具**来创建新的模块模板，详情参考文档：[开发辅助工具](https://github.com/leizongmin/bamei/tree/master/tools)

### 初始化本地开发环境

在项目根目录下执行以下命令完成初始化：

```bash
$ npm install --registry=https://registry.npm.taobao.org
$ npm run setup
```

稍等几分钟，初始化程序会自动为本项目下的所有子模块安装依赖（使用**CNPM**镜像）。

### 执行 eslint 检查

在项目根目录下执行以下命令：

```bash
$ node tools eslint
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
