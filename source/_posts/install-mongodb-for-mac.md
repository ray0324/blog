
---
title: Mac下安装 MongoDB
tags:
  - Mac
  - MongoDB
---

## 升级 Homebrew

```shell
brew update
```

## 安装MongoDB

```bash
brew install MongoDB
```

等待安装完成

## 启动MongoDB

作为一个服务启动：

```bash
brew services start MongoDB
```

是在终端中临时启动

```bash
mongod --config /usr/local/etc/mongod.conf
```

## 连接数据库

```bash
mongo

MongoDB shell version v3.4.3
connecting to: mongodb://127.0.0.1:27017
```

## MongoDB 数据库连接工具
 - [Robomongo](https://robomongo.org/)
