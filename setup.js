'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');
const child_process = require('child_process');

console.log('正在初始化本地开发环境...');

console.log('安装 tools 的依赖...');
child_process.execSync('npm install --registry=https://registry.npm.taobao.org', {
  cwd: path.resolve(__dirname, 'tools'),
  stdio: [ 0, 1, 2 ],
});

console.log('利用 tools 安装所有模块的依赖...');
child_process.execSync('node tools install-dependencies', {
  stdio: [ 0, 1, 2 ],
});
