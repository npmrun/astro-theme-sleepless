---
title: 链式promise调用
pubDate: 2024/08/30 09:32:00
updatedDate: 2024/08/30 09:32:00
author: NPMRUN
category: 技术
tags:
  - 技术
heroImage: https://api.r10086.com/%E5%9B%BE%E5%8C%85webp/%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%882/48cf0b92dd80ccdd4898e6b4734105fc.png!q90.webp
hot: false
hidden: false
relatedPosts: []
---
```js
export function to(
    promise,
    errorExt
) {
    return promise
        .then((data) => [null, data])
        .catch((err) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt);
                return [parsedError, undefined];
            }

            return [err, undefined];
        });
}
```

该思路十分类似于go的书写方式
