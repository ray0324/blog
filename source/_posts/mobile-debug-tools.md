---
title: 手机调试工具
date: 2021-08-16 11:07
tags:
  - debug
  - vconsole
  - eruda
---

## 工具

- [Eruda](https://github.com/liriliri/eruda)
- [vConsole](https://github.com/Tencent/vConsole)

## 快捷使用

**可以通过URL调用js的方式加载到页面使用**

### Eruda

```js
javascript:(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })();
```

### vConsole

```js
javascript:(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/vconsole"; document.body.appendChild(script); script.onload = function () { new VConsole() } })();
```
