---
title: 使用Electron+Typescript开发桌面应用
date: 2019-12-06 08:47
tags:
  - React
  - Electron
---

## 安装Electron

这是进行electron开发的第一步，而很多人都在这一步卡住了。electron的安装源被墙，首先需要设置代理
设置镜像.

```conf
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
electron_custom_dir=7.1.3
```

具体原因参考 [electron 7.0.0安装失败](https://segmentfault.com/a/1190000020890483)

## 配置webpack

webpack为electron提供了专门的环境支持，不同与普通项目，我们需要对electron项目的主线程和渲染
线程代码分别进行配置，webpack 3.1+ 支持多配置导出，详情参考[exporting-multiple-configurations](https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations)

针对electron主进程和渲染进程，需要分别进行构建配置，这里需要注意参考[webpack target说明](https://webpack.js.org/configuration/target/#target)

## 配置参考

[electron-typescript-boilerplate](https://github.com/ray0324/electron-typescript-boilerplate/tree/master/webpack)


