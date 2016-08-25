#!/usr/bin/env node

'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const colors = require('colors');
const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'framework',
    message: '选择 Web 框架',
    choices: [
      {
        name: 'Express',
        value: 'express',
      },
      {
        name: 'Koa',
        value: 'koa',
      },
    ],
  },
  {
    type: 'confirm',
    name: 'session',
    message: '是否启用 session',
    default: true,
  },
  {
    type: 'list',
    name: 'sessionStore',
    message: '请选择 session 存储引擎',
    when(answers) {
      return answers.session;
    },
    choices: [
      {
        name: '内存',
        value: 'memory',
      },
      {
        name: 'Redis',
        value: 'redis',
      },
      {
        name: 'Memcached',
        value: 'memcached',
      },
      {
        name: 'MongoDB',
        value: 'mongo',
      },
      {
        name: '文件',
        value: 'file',
      },
    ],
  },
  {
    type: 'list',
    name: 'template',
    message: '请选择模板引擎',
    choices: [
      {
        name: 'ejs',
        value: 'ejs',
      },
      {
        name: 'Nunjucks',
        value: 'nunjucks',
      },
    ],
  },
  {
    type: 'checkbox',
    name: 'database',
    message: '请选择数据库',
    choices: [
      {
        name: 'MySQL',
        value: 'mysql',
      },
      {
        name: 'SQLite3',
        value: 'sqlite',
      },
      {
        name: 'Redis',
        value: 'redis',
      },
      {
        name: 'MongoDB',
        value: 'mongoose',
      },
    ],
  },
  {
    type: 'confirm',
    name: 'knexMysql',
    message: 'MySQL 客户端是否使用 Knex',
    default: false,
    when(answers) {
      return answers.database && answers.database.indexOf('mysql') !== -1;
    },
  },
];

inquirer.prompt(questions).then(answers => {
  console.log('');
  if (answers.framework === 'koa') {
    return console.log(colors.yellow('对不起！目前还不支持 Koa 框架！'));
  }

  // 生成依赖的模块列表
  const modules = [];

  modules.push(answers.framework);

  if (answers.session) {
    switch (answers.sessionStore) {
    case 'memory':
      modules.push('express-session-memory');
      break;
    case 'redis':
      modules.push('express-session-redis');
      break;
    case 'memcached':
      modules.push('express-session-memcached');
      break;
    case 'mongo':
      modules.push('express-session-mongo');
      break;
    case 'file':
      modules.push('express-session-file');
      break;
    }
  }

  switch (answers.template) {
  case 'nunjucks':
    modules.push('express-engine-nunjucks');
  }

  for (const db of answers.database) {
    if (db === 'mysql') {
      if (answers.knexMysql) {
        modules.push('express-knex-mysql');
      } else {
        modules.push('mysql');
      }
    } else {
      modules.push(db);
    }
  }

  const code = `
'use strict';

module.exports = require('bamei').create(function () {

  // 初始化模块
${ modules.map(n => '  this.module(\'' + n + '\');').join('\n') }

  this.init(err => {
    if (err) throw err;

    // 开启全局错误捕获
    this.catchError();

    console.log(this.config.all());
    this.getLogger('init').info('server started');
  });
});
  `;
  console.log(colors.yellow(code));

  require('./init_project')(code);

}).catch(err => {
  console.error(colors.red(err.stack));
});
