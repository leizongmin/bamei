'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const child_process = require('child_process');

function publishDir(name, dir) {
  const file = `${ dir }/package.json`;
  const pkg = require(file);
  console.log(`发布模块 ${ name } 到版本 ${ pkg.version }`);
  try {
    child_process.execSync('npm publish', { cwd: dir, stdio: [ 0, 1, 2 ]});
  } catch (err) {
    console.log(colors.red(`发布失败: ${ err.message }`));
  }
}

publishDir('scaffolding', path.resolve(__dirname, '../../scaffolding'));

const modulesDir = path.resolve(__dirname, '../../modules');
fs.readdirSync(modulesDir).forEach(name => {
  const dir = path.resolve(modulesDir, name);
  if (fs.statSync(dir).isDirectory()) {
    publishDir(name, dir);
  }
});

console.log('完成。');
