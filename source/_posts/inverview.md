---
title: 前端面试
date: 2021-03-26 14:56
tags:
  - Interview
---

## HTML

- `<script> <script async> and <script defer>`有啥区别？
- 通常我们习惯于在`<head>`中使用`<link>`标签加载CSS而在`<body>`的结束标签前用`<script>`标签加载js，这样做有什么好处?
- 移动端如何调用手机相机或相册?
- 常见的input类型有哪些？

## CSS/Less/Sass

- Normalize.css和Reset CSS有什么区别？你一般如何选择？
- `box-sizing: border-box`的作用是什么？
- `display: none;`与`visibility: hidden;`的区别？
- 在项目开发中有用过哪一些css预处理技术?(Postcss|Less|Sass|CssModules...)
- 如何进行CSS模块化？有哪些手段可以进行css模块化
- rem与px,移动端如何适配多屏？
- 开源组件样式定制？

## JavaScript

### 基础

- 使用let、var和const创建变量有什么区别？
- 基本类型与引用类型的区别？
- `==` 与 `===` 区别？
- 什么是深拷贝，什么是浅拷贝？
- bind、call、apply的区别？用途？
- 什么是事件委托，目的，功能，写法?
- 事件对象Event.target与Event.currenttarget有什么区别?
- 什么是闭包，闭包的作用与缺点？
- null, undefined与undeclared的区别？如何在程序检测他们？
- Promise async/await 的用法?
- 跨域问题怎么解决?
- GET与POST通讯的区别？
- cookie、localStorage、sessionStorage区别？
- 如何判断一个变量是为0 或者 '0' ?
- 如何检测`undefined`和`null`？
- 兼容性(shim/polyfill/babel/core-js)
- 常见性能优化方法？
- 防抖、节流
- 响应式编程(RxJS)
- 函数式编程(FP)

### React

- 生命周期
- hooks
- useCallback的作用

### Vue

- 框架特点
- 路由与状态管理
- 生命周期

## TypeScript

- TypeScript和JavaScript有什么不同？
- 列出使用Typescript的一些优点?

## 通信/网络安全

- XSS 跨站脚本攻击（Cross Site Scripting）
- XSRF 跨站请求伪造
- 跨域请求(CORS/JSONP)


## HTTP/HTTPS

- 方法(GET/POST/PUT/DELETE/HEAD/OPTION)
- URL编码、解码
- 文件上传

## 项目构建/自动化

- webpack\gulp\grunt\rollup
- babel\postcss...
- CI/CD(Jekins/Drone)

## 性能优化

- 常见的性能优化策略(减少请求、文件压缩混淆、算法优化、缓存...)

## 版本管理与协作

- Git/SVN
- Gogs/Github/GitLab/Gitea
- 禅道

## 拓展

- Nodejs(Koa/Express/Eggjs...)
- Npm/Yarn
- Electron/React Native