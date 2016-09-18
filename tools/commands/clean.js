'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const colors = require('colors');
// const inquirer = require('inquirer');
const child_process = require('child_process');

function workspaceDir(...names) {
  return path.resolve(__dirname, '../../', ...names);
}


clean(workspaceDir('scaffolding'));
clean(workspaceDir('generator'));

function eachDir(parentDir) {
  fs.readdirSync(parentDir).forEach(name => {
    const dir = path.resolve(parentDir, name);
    console.log(dir);
    if (fs.statSync(dir).isDirectory()) {
      clean(dir);
    }
  });
}

eachDir(workspaceDir('modules'));
eachDir(workspaceDir('examples'));

console.log('完成。');


function clean(dir) {
  console.log(colors.green(`cd ${ dir } && rm -rf node_modules`));
  try {
    child_process.execSync('rm -rf node_modules', {
      stdio: [ 0, 1, 2 ],
      cwd: dir,
    });
  } catch (err) {
    console.log(colors.red(err));
  }
}
