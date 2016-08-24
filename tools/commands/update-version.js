'use strict';

/**
 * 项目脚手架开发工具
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const inquirer = require('inquirer');
const utils = require('lei-utils');

const currentVersion = require('../../scaffolding/package.json').version;
console.log(colors.rainbow('!!!!!!!!!!! ') + `当前版本: ${ currentVersion.white }` + colors.rainbow(' !!!!!!!!!!!'));

function incrSemverVersion(version, part) {
  const semvers = version.split('.').map(v => parseInt(v, 10));
  semvers[part] += 1;
  return semvers.join('.');
}

const versionNextSuggest = {
  major: incrSemverVersion(currentVersion, 0),
  feature: incrSemverVersion(currentVersion, 1),
  patch: incrSemverVersion(currentVersion, 2),
};

const schema = [{
  type: 'list',
  name: 'version',
  message: colors.gray('semver 规范的版本号:'),
  default: versionNextSuggest.patch,
  choices: [
    {
      short: '自定义',
      name: '自定义\n'
      + colors.gray('  - 格式如 ${major}.${feature}.${patch}(请遵循 semver 规范)'),
      value: false,
    },
    {
      short: versionNextSuggest.patch,
      name: 'patch   (' + versionNextSuggest.patch + ')\n'
      + colors.gray('  - 递增修订版本号(用于 bug 修复)'),
      value: versionNextSuggest.patch,
    },
    {
      short: versionNextSuggest.feature,
      name: 'feature (' + versionNextSuggest.feature + ')\n'
      + colors.gray('  - 递增特性版本号(用于向下兼容的特性新增, 递增位的右侧位需要清零)'),
      value: versionNextSuggest.feature,
    },
    {
      short: versionNextSuggest.major,
      name: 'major   (' + versionNextSuggest.major + ')\n'
      + colors.gray('  - 递增主版本号  (用于断代更新或大版本发布，递增位的右侧位需要清零)'),
      value: versionNextSuggest.major,
    },
  ],
}];

// 开始
inquirer.prompt(schema).then(answers => {
  if (!answers.version) {
    return inputVersion();
  }
  return updateVersion(answers.version);
}).catch(err => {
  console.error(err.stack);
});

// 要求手动输入版本
function inputVersion() {
  const schema = [{
    type: 'input',
    name: 'version',
    message: 'semver 规范的版本号',
    validate(value) {
      if (!/^\d+\.\d+\.\d+$/.test(value)) {
        return colors.red('[X] 格式如 ${major}.${feature}.${patch} (请遵循 semver 规范)');
      }
      return true;
    },
  }];
  return inquirer.prompt(schema).then(answers => updateVersion(answers.version));
}

// 开始更新各个模块的版本
function updateVersion(version) {

  function updateDir(name, dir) {
    console.log(`更新模块 ${ name } 版本到 ${ version }`);
    const file = `${ dir }/package.json`;
    const pkg = require(file);
    pkg.version = version;
    fs.writeFileSync(file, utils.jsonStringify(pkg, 2));
  }

  updateDir('scaffolding', path.resolve(__dirname, '../../scaffolding'));

  const modulesDir = path.resolve(__dirname, '../../modules');
  fs.readdirSync(modulesDir).forEach(name => {
    const dir = path.resolve(modulesDir, name);
    if (fs.statSync(dir).isDirectory()) {
      updateDir(name, dir);
    }
  });

  console.log('完成。');
}
