/**
 * Created by joneszhu on 16/9/1.
 */
'use strict';


module.exports = function (ctx) {

  const router = ctx.get('express').registerAsyncRouter('test');

  // 两秒延迟之后返回hello world.
  router.get('/test/msg', async function (req, res, _next) {
    const msg = await delayMsg('hello world');
    res.end(msg);
  });

  function delayMsg(text) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve(text);
      }, 2000);
    });
  }

  // 测试框架对于async function的错误捕捉能力
  router.get('/test/err', async function (req, res, _next) {
    await delayError();
    res.end('这里不会被返回,捕捉到异常会跳转到express最外层的异常处理函数');
  });

  function delayError() {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new Error('MyError'));
      });
    });
  }
};
