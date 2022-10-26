---
title: 银行卡号校验(Luhn校验)
date: 2020-05-15 09:21
tags:
  - Luhn
---

常用的银行卡号码采用**Luhn算法(Luhn algorithm)**进行校验，算法具体参考百度百科。
这里给出js版本的实现：

```js
function luhnValidate(num) {
  if (!/^\d+$/.test(num)) return false;
  const arr = num.split('').reverse().map(i => parseInt(i));
  const sum = arr.reduce((prev, cur, i) => {
    // 偶数位
    if (i % 2 === 1) {
      return prev + Math.floor((cur * 2) / 10) + ((cur * 2) % 10);
    }
    // 奇数位
    return prev + cur;
  }, 0);

  return sum % 10 === 0;
}
```
