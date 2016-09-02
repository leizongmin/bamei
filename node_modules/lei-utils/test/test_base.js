'use strict';

/**
 * lei-utils tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const assert = require('assert');
const utils = require('../');

describe('base', function () {

  it('md5', function () {
    assert.equal(utils.md5('123333'), 'ce9e8dc8a961356d7624f1f463edafb5');
    assert.equal(utils.md5('11111'), 'b0baee9d279d34fa1dfd71aadb908c3f');
  });

  it('encryptPassword & validatePassword', function () {
    const p1 = utils.encryptPassword('123456');
    const p2 = utils.encryptPassword('123456');
    const p3 = utils.encryptPassword('123456');
    const p4 = utils.encryptPassword('aaaaaa');
    assert.equal(p1.length, 38);
    assert.notEqual(p1, p2);
    assert.notEqual(p1, p3);
    assert.notEqual(p2, p3);
    assert.equal(utils.validatePassword('123456', p1), true);
    assert.equal(utils.validatePassword('123456', p2), true);
    assert.equal(utils.validatePassword('123456', p3), true);
    assert.equal(utils.validatePassword('1234567', p1), false);
    assert.equal(utils.validatePassword('123456', p4), false);
  });

  it('encryptData & decryptData', function () {
    const k = 'mykey';
    const d1 = utils.encryptData('hello,world', k);
    const d2 = utils.encryptData({msg: 'hello,老雷'}, k);
    assert.equal(typeof d1, 'string');
    assert.equal(typeof d2, 'string');
    assert.deepEqual(utils.decryptData(d1, k), 'hello,world');
    assert.deepEqual(utils.decryptData(d2, k), {msg: 'hello,老雷'});
    assert.throws(() => {
      utils.decryptData(d1, 'aaaa');
    });
  });

  it('randomString & randomNumber & randomLetter', function () {
    for (let i = 1; i < 100; i++) {
      const s = utils.randomString(i);
      assert.equal(s.length, i);
      assert.equal(/[a-zA-Z0-9]/.test(s), true);
    }
    for (let i = 1; i < 100; i++) {
      const s = utils.randomNumber(i);
      assert.equal(s.length, i);
      assert.equal(/[0-9]/.test(s), true);
    }
    for (let i = 1; i < 100; i++) {
      const s = utils.randomLetter(i);
      assert.equal(s.length, i);
      assert.equal(/[a-zA-Z]/.test(s), true);
    }
  });

});
