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

// const questions = [
//   {
//     type: 'confirm',
//     name: 'cnpm',
//     message: '是否使用CNPM安装',
//     default: true,
//   },
// ];
// inquirer.prompt(questions).then(answer => {
//   if (answer.cnpm) {
//     start('npm install --registry=https://registry.npm.taobao.org');
//   } else {
//     start('npm install');
//   }
// });

start('npm install --registry=https://registry.npm.taobao.org');

function workspaceDir(...names) {
  return path.resolve(__dirname, '../../', ...names);
}

function start(cmd) {
  npmInstall(cmd, workspaceDir('scaffolding'));
  npmInstall(cmd, workspaceDir('generator'));
  
  function eachDir(parentDir, install) {
    fs.readdirSync(parentDir).forEach(name => {
      const dir = path.resolve(parentDir, name);
      console.log(dir);
      if (fs.statSync(dir).isDirectory()) {
        if (install) {
          install(cmd, dir);
        } else {
          npmInstall(cmd, dir);
        }
      }
    });
  }

  eachDir(workspaceDir('modules'));

  // examples 不安装 bamei- 开头的模块
  eachDir(workspaceDir('examples'), (cmd, dir) => {
    const list = [];
    const pkg = require(path.resolve(dir, 'package.json'));
    if (pkg.dependencies) addDependencies(pkg.dependencies);
    if (pkg.devDependencies) addDependencies(pkg.devDependencies);
    function addDependencies(map) {
      for (const name in map) {
        if (name !== 'bamei' && name.indexOf('bamei-') !== 0) {
          list.push(`${ name }@${ map[name] }`);
        }
      }
    }
    npmInstall(`${ cmd } ${ list.join(' ') }`, dir);
  });

  console.log('完成。');
}

function npmInstall(cmd, dir) {
  console.log(colors.green(`cd ${ dir } && npm ${ cmd }`));
  try {
    child_process.execSync(cmd, {
      stdio: [ 0, 1, 2 ],
      cwd: dir,
    });
  } catch (err) {
    console.log(colors.red(err));
  }
}
