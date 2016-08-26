'use strict';

/**
 * 项目脚手架 mongoose 模块
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Use native promises
mongoose.Promise = global.Promise;

// 版本号
exports.version = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')).toString()).version;

// 依赖模块
exports.dependencies = {};

// 填充默认配置
exports.config = function fillDefaultConfig(config) {
  return Object.assign({
    // 连接字符串
    url: 'mongodb://localhost/test',
    // 其他参考 mongoose 模块
  }, config);
};

// 初始化
exports.init = function initMongooseModule(ref, config, done) {

  // 默认配置
  // eslint-disable-next-line
  config = exports.config.call(this, config);
  this.getLogger('init').trace('initMongooseModule config: %j', config);

  const client = mongoose.createConnection(config.url, config);

  // 定义或获取 model
  function model(name, schema) {
    if (schema) {
      client.model(name, new Schema(schema));
    }
    return client.model(name);
  }

  Object.assign(ref, { $ns: 'mongoose', client, Schema, ObjectId, model });

  done();

};
