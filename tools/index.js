'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const colors = require('colors');
const inquirer = require('inquirer');

if (process.argv[2]) {
  return runCommand(process.argv[2]);
}

const questions = [{
  type: 'list',
  name: 'command',
  message: '选择要执行的命令',
  choices: [
    {
      name: '创建新的模块',
      value: 'new-module',
    },
    {
      name: '更新模块文档',
      value: 'update-docs',
    },
    {
      name: '更新模块版本号',
      value: 'update-version',
    },
    {
      name: '发布所有模块',
      value: 'publish-all',
    },
    {
      name: '初始化开发环境（安装依赖模块）',
      value: 'install-dependencies',
    },
    {
      name: '退出 ^C',
      value: 'exit',
    },
  ],
}];

inquirer.prompt(questions).then(answers => {
  if (answers.command === 'exit') return;
  runCommand(answers.command);
}).catch(err => {
  console.error(colors.red(err.stack));
});

function runCommand(command) {
  require(`./commands/${ command }`);
}
