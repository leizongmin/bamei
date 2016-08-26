'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const ejs = require('ejs');

function readTpl(name) {
  return fs.readFileSync(path.resolve(__dirname, `./update-docs/${ name }`)).toString();
}

const tplREADME = readTpl('README.tpl.md');
const modules = [];

function updateREADME(name, dir) {
  const file = path.resolve(dir, 'package.json');
  const pkg = require(file);
  const module = require(dir);
  console.log(`更新模块 ${ name }@${ pkg.version } 的文档`);
  modules.push(pkg);
  try {
    const config = (module.config.toString());
    const dependencies = Object.keys(module.dependencies).map(name => {
      return {
        name: `bamei-module-${ name }`,
        shortName: name,
        version: module.dependencies[name],
      };
    });
    const description = (pkg.description && pkg.description !== name) ? pkg.description : '';
    let usage = '';
    const usageFile = path.resolve(dir, 'usage.md');
    if (fs.existsSync(usageFile)) {
      usage = fs.readFileSync(usageFile).toString();
    }
    const readme = ejs.render(tplREADME, {
      shortName: name,
      name: pkg.name,
      config,
      dependencies,
      description,
      usage,
    });
    const readmeFile = path.resolve(dir, 'README.md');
    fs.writeFileSync(readmeFile, readme);
    console.log(colors.green(`+ 写入文件: ${ readmeFile }`));
  } catch (err) {
    console.log(colors.yellow(`+ 失败: ${ err.stack }`));
  }
}

// 生成各个模块的 README.md
const modulesDir = path.resolve(__dirname, '../../modules');
fs.readdirSync(modulesDir).forEach(name => {
  const dir = path.resolve(modulesDir, name);
  if (fs.statSync(dir).isDirectory()) {
    updateREADME(name, dir);
  }
});

// 生成模块列表
const modulesFile = path.resolve(__dirname, '../../modules/README.md');
fs.writeFileSync(modulesFile, ejs.render(readTpl('modules.tpl.md'), { modules }));
console.log(colors.green(`写入文件: ${ modulesFile }`));

console.log('完成。');
