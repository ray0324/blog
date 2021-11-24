---
title: JS中纯粹对象判断
date: 2021-11-24 13:18
tags:
  - validate
---


```js
// 当 val通过postMessage跨window传递的时候会有bug
export function isPlainObject(val) {
  if (Object.prototype.toString.call(val) !== '[object Object]') {
    return false;
  }
  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

// 此方法暂无bug(lodash)
function isPlainObject(value) {
  if (Object.prototype.toString.call(value) != '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
```