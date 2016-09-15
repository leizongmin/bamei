'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const path = require('path');
const child_process = require('child_process');
const colors = require('colors');

console.log('执行 eslint 格式化代码...');
try {
  child_process.execSync('node ./node_modules/.bin/eslint . --fix', {
    cwd: path.resolve(__dirname, '../..'),
    stdio: [ 0, 1, 2 ],
  });
  console.log(colors.green('\n代码已通过 eslint 检查。'));
} catch (err) {
  console.log(colors.red(err));
  if (err.status === 1) {
    console.log(colors.yellow('\n代码未通过 eslint 检查！'));
  }
}
