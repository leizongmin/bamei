'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');
const child_process = require('child_process');

console.log('执行 eslint 格式化代码...');
child_process.execSync('./node_modules/eslint . --fix', {
  cwd: path.resolve(__dirname),
  stdio: [ 0, 1, 2 ],
});
