'use strict';

module.exports = function (ctx) {
  const redis = ctx.get('redis.client');

  const getNumber = (name = 'default', number = 1, width = 8) => {
    return new Promise((resolve, reject) => {
      redis.incrby('coun:' + name, number)
        .then(success => {
          const max = Math.pow(10, width);
          resolve(((new Array(width).join(0)) + success % max).slice(0 - width));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  ctx.set('counter', getNumber);
};
