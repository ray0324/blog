---
title: 利用Verdaccio搭建NPM私有仓库
date: 2021-02-02 11:02
tags:
  - Verdaccio
  - Sinopia
---

## 场景

1. 服务器端用内网连接，npm仓库无法下载
2. 私有npm包，不想发布到公网

## 安装

```bash
npm install -g verdaccio
```
## 启动

```bash
verdaccio
```
## 配置

```yaml
#
# This is the default config file. It allows all users to do anything,
# so don't use it on production systems.
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

listen: 0.0.0.0:4873

# path to a directory with all packages
storage: /root/.local/share/verdaccio/storage
# path to a directory with plugins to include
plugins: ./plugins

web:
  title: Verdaccio
  # comment out to disable gravatar support
  # gravatar: false
  # by default packages are ordercer ascendant (asc|desc)
  # sort_packages: asc
  # convert your UI to the dark side
  # darkMode: true

# translate your registry, api i18n not available yet
# i18n:
# list of the available translations https://github.com/verdaccio/ui/tree/master/i18n/translations
#   web: en-US

auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # max_users: 1000

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npm.taobao.org/
packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish/publish packages
    # (anyone can register by default, remember?)
    publish: $authenticated
    unpublish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: taobao

# You can specify HTTP/1.1 server keep alive timeout in seconds for incoming connections.
# A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.
# WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# log settings
logs:
  - { type: stdout, format: pretty, level: http }
  #- {type: file, path: verdaccio.log, level: info}
#experiments:
#  # support for npm token command
#  token: false
#  # support for the new v1 search endpoint, functional by incomplete read more on ticket 1732
#  search: false
#  # disable writing body size to logs, read more on ticket 1912
#  bytesin_off: false

# This affect the web and api (not developed yet)
#i18n:
#web: zh-CN


```

## 启动服务

```bash
# 使用pm2启动服务
pm2 start `which verdaccio`
```

## 配置NPM源码

```bash
# 使用nrm管理npm源
npm i -g nrm

# 添加源
nrm add local http://localhost:4873/
# 使用
nrm use local

```

## 使用NPM
```bash
#创建用户
npm adduser

#发布包
npm publish

```
