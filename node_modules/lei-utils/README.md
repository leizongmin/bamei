# node-lei-utils

安装

```bash
$ npm install lei-utils --save
```


一些常用的工具函数

+ `bugfree (doNotOutput)`
+ `sha1 (text)`
+ `md5 (text)`
+ `fileSha1 (filename, callback)`
+ `fileMd5 (filename, callback)`
+ `encryptPassword (password)`
+ `validatePassword (password, encrypted)`
+ `encryptData (data, secret)`
+ `decryptData (str, secret)`
+ `randomString (size, chars)`
+ `randomNumber (size)`
+ `randomLetter (size)`
+ `date (format, timestamp)`
+ `noop (err)`
+ `isString (str)`
+ `isInteger (str)`
+ `isNumber (str)`
+ `cloneObject (obj)`
+ `merge ()`
+ `jsonStringify (data, space)`
+ `argumentsToArray (args)`
+ `getArrayLastItem (arr)`
+ `throttleAsync (fn, maxCount)`
+ `inheritsEventEmitter (fn)`
+ `inherits (fn, superConstructor)`
+ `extend ()`
+ `array`
  + `last (arr)`
  + `head (arr)`
  + `first (arr)`
  + `rest (arr)`
  + `copy (arr)`
  + `concat ()`
+ `customError (name, info)`
+ `isPromise (p)`
+ `async`
+ `promise`
  + `call (fn)`
  + `all (_args)`



# License

```
The MIT License (MIT)

Copyright (c) 2014-2015 老雷

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
