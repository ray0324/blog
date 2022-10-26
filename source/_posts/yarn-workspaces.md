---
title: yarn workspaces
date: 2022-10-26 13:27
tags:
  - workspace
  - monorepo
---

## Yarn berry环境安装

### 全局安装yarn

```bash
npm i -g yarn
```

### 在项目中开启yarn berry

``` bash
cd project
yarn set version berry
# 或者设置到最新版本
#yarn set version latest
```

### 设置代理

创建`.yarnrc.yml`文件

```yml
httpProxy: "http://127.0.0.1:1087"
httpsProxy: "http://127.0.0.1:1087"
yarnPath: .yarn/releases/yarn-3.2.4.cjs
```

### 安装相关插件

```bash
# 查看已经存在的插件
yarn plugin runtime

# 列出可以安装的插件
yarn plugin list

# 在当前环境倒入插件
yarn plugin import workspace-tools

```

### workspaces相关操作

```bash
# 列出所有包
yarn workspaces list

# 构建所有包
yarn workspaces foreach run build

# 构建单个包 @yv2/foo 为包在package.json中的名称
yarn workspace @yv2/foo build

```








