'use strict';

/**
 * lei-utils tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const assert = require('assert');
const utils = require('../');

describe('promise', function () {

  describe('call', function () {

    it('passed callback - success', function (done) {

      function sleep(ms, msg, callback) {
        setTimeout(function () {
          callback(null, msg);
        }, ms);
      }

      utils.promise.call(sleep, 100, 'hello')
      .then(ret => {
        assert.equal(ret, 'hello');
        done();
      })
      .catch(done);

    });

    it('passed callback - error', function (done) {

      function sleep(ms, msg, callback) {
        setTimeout(function () {
          callback(new Error(msg));
        }, ms);
      }

      utils.promise.call(sleep, 100, 'hello')
      .then(ret => {
        done(new Error('must throws error'));
      })
      .catch(err => {
        assert.equal(err.message, 'hello');
        done();
      });

    });

    it('return promise - success', function (done) {

      function sleep(ms, msg, callback) {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            resolve(msg);
          }, ms);
        });
      }

      utils.promise.call(sleep, 100, 'hello')
      .then(ret => {
        assert.equal(ret, 'hello');
        done();
      })
      .catch(done);

    });

    it('return promise - success', function (done) {

      function sleep(ms, msg, callback) {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            reject(new Error(msg));
          }, ms);
        });
      }

      utils.promise.call(sleep, 100, 'hello')
      .then(ret => {
        done(new Error('must throws error'));
      })
      .catch(err => {
        assert.equal(err.message, 'hello');
        done();
      });

    });

  });

  describe('all', function () {

    it('array - success', function (done) {

      function sleep(ms, msg, callback) {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            resolve(msg);
          }, ms);
        });
      }

      utils.promise.all([
        sleep(50, 'AA'),
        sleep(100, 'BB'),
        sleep(30, 'CC'),
        sleep(0, 'DD'),
      ])
      .then(ret => {
        assert.deepEqual(ret, [[null, 'AA'], [null, 'BB'], [null, 'CC'], [null, 'DD']]);
        done();
      })
      .catch(done);

    });

    it('flat - success', function (done) {

      function sleep(ms, msg, callback) {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            resolve(msg);
          }, ms);
        });
      }

      utils.promise.all(
        sleep(50, 'AA'),
        sleep(100, 'BB'),
        sleep(30, 'CC'),
        sleep(0, 'DD')
      )
      .then(ret => {
        assert.deepEqual(ret, [[null, 'AA'], [null, 'BB'], [null, 'CC'], [null, 'DD']]);
        done();
      })
      .catch(done);

    });

    it('flat - error', function (done) {

      function sleep(ms, msg, callback) {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            reject(new Error(msg));
          }, ms);
        });
      }

      utils.promise.all(
        sleep(50, 'AA'),
        sleep(100, 'BB'),
        sleep(30, 'CC'),
        sleep(0, 'DD')
      )
      .then(ret => {
        const msgs = [];
        for (const item of ret) {
          assert.equal(item[0] instanceof Error, true);
          msgs.push(item[0].message);
        }
        assert.deepEqual(msgs, ['AA', 'BB', 'CC', 'DD']);
        done();
      })
      .catch(done);

    });

  });

});
