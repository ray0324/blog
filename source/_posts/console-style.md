---
title: 设置控制台打印样式
date: 2021-06-08 13:29
tags:
  - console
---


```js
console.log(
  `%c external %c v1.3.1 %c`,
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
  'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
  'background:transparent'
)
```
