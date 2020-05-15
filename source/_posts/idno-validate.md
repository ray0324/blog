---
title: 身份证号码校验
date: 2020-05-15 08:30
tags:
  - idno
  - validate
---

公民身份号码的校验遵循**GB11643-1999**标准

## 定义

身份号码(18位)包含由17位**本体码(master number)**和1位**校验码(check number)**组成。
具体校验算法参考**GB11643-1999**标准

## 18位身份证号码校验算法

```js
function isIdNo18(num) {
  if (num.length !== 18) {
    throw new Error("ID length must be 18");
  }

  const arr = num.split("");
  // replace x width 10;
  arr[17] = arr[17].toLowerCase() === "x" ? 10 : arr[17];

  // sum
  const sum = arr.reduceRight((prev, cur, i) => {
    return prev + (Math.pow(2, 17 - i) % 11) * Number(cur);
  }, 0);

  return sum % 11 === 1;
}

```
