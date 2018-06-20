# Cache Test
## はじめに
とあるシステムにキャッシュを導入するため、使えそうな Node.js のライブラリを調査します。

## 性能測定
* キャッシュに次のデータをセットして、100万回 get した時の処理時間を計測します。(for ループを含見ます)

    | Key     | Value                     |
    |:--------|:--------------------------|
    | 'hello' | {message: 'Hello world.'} |

* 測定結果を以下に示します。

    | # | Module           | 1 million get(ms) |
    |--:|------------------|------------------:|
    | 1 | memory-cache     | 13.976            |
    | 2 | memory-cache-ttl | 3.420             |
    | 3 | lru-cache        | 74.291            |
    | 4 | node-cache       | 553.972           |

    > TTL: Time to Live

## まとめ
1. [memory-cache](https://www.npmjs.com/package/memory-cache)
    - license: BSD-2-Clause
    - TTL を設定できません。
1. [memory-cache-ttl](https://www.npmjs.com/package/memory-cache-ttl)
    - license: BSD-2-Clause
    - インスタンスを一つしか作れません。
    - 最速だけど結果が怪しい？ (空の for-loop よりも速い)
1. [lru-cache](https://www.npmjs.com/package/lru-cache)
    - license: ISC
    - インスタンスに件数や TTL(ms) を指定できます。
    - データセット時にも個別に TTL(ms) を指定できます。
    - キーにオブジェクトを設定できます。
        - いいね！と思いましたが、参照が一致しないとヒットしません。どこで使うのでしょう？？
    - maxAge を設定しないととても速いです。 14.745ms
        - 件数制限 (max) だけで良い場合は効果的だと思います。
1. [node-cache](https://www.npmjs.com/package/node-cache)
    - license: MIT
    - インスタンスに TTL(s) や checkperiod(s) を指定できます。
    - データセット時にも個別に TTL(ms) を指定できます。
    - とても高機能、エラーハンドリングの方法も充実しています。
    - 但し、遅いです。