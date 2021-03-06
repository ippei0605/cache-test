/**
 * @file Cache Test: lru-cache
 * @author Ippei SUZUKI
 * @see {@link https://www.npmjs.com/package/lru-cache}
 */

'use strict';

// モジュールを読込む。
const
    LRU = require("lru-cache"),
    options = {
        max: 500,
        maxAge: 1000 * 60 * 60
    },
    cache = LRU(options);


// キャッシュにデータをセットする。
cache.set('hello', {message: 'Hello world.'});
console.log(cache.get('hello'));

// 計測 cache-get
console.time('cache-get');
for (let i = 0; i < 1000000; i++) {
    let temp = cache.get('hello');
}
console.timeEnd('cache-get');
