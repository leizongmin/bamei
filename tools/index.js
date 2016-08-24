'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const inquirer = require('inquirer');

const schema = [{
  type: 'list',
  name: 'command',
  message: '选择要执行的命令',
  choices: [
    {
      name: 'update-version (更新模块版本号)',
      value: 'update-version',
      short: 'update-version',
    },
    {
      name: 'new-module (创建新的 module)',
      value: 'new-module',
      short: 'new-module',
    },
  ],
}];

inquirer.prompt(schema).then(answers => {
  require(`./commands/${ answers.command }`);
}).catch(err => {
  console.error(err.stack);
});
