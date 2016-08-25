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

const tplREADME = fs.readFileSync(path.resolve(__dirname, './new-module/README.tpl.md')).toString();

function updateREADME(name, dir) {
  const file = `${ dir }/package.json`;
  const pkg = require(file);
  const module = require(dir);
  console.log(`更新模块 ${ name }@${ pkg.version } 的文档`);
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
    const readme = ejs.render(tplREADME, {
      shortName: name,
      name: pkg.name,
      config,
      dependencies,
      description,
    });
    const readmeFile = path.resolve(dir, 'README.md');
    fs.writeFileSync(readmeFile, readme);
    console.log(colors.green(`+ 写入文件: ${ readmeFile }`));
  } catch (err) {
    console.log(colors.yellow(`+ 失败: ${ err.stack }`));
  }
}

const modulesDir = path.resolve(__dirname, '../../modules');
fs.readdirSync(modulesDir).forEach(name => {
  const dir = path.resolve(modulesDir, name);
  if (fs.statSync(dir).isDirectory()) {
    updateREADME(name, dir);
  }
});

console.log('完成。');
