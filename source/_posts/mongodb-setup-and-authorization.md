---
title: Mongodb登陆与授权
date: 2018-04-02 08:52
tags:
  - Mongodb
---

## 设置用户账号

```bash
# 安装完成后进入mongodb
$ mongo
# 设置用户账号
> use admin
switched to db admin
> db.createUser({
  user: "root",
  pwd: "root#root",
  roles: [ { role: "__system", db: "admin" } ]
 })
Successfully added user: {
  "user" : "root",
  "roles" : [
    {
      "role" : "__system",
      "db" : "admin"
    }
  ]
}
# 使用设置的账号登录admin数据库
$ mongo localhost:27017/admin -u root  -p
MongoDB shell version: 3.2.3
Enter password:

```
## 重启服务

```
# windows
mongod --config=mongo.config --install --serviceName "MongoDB" --journal

```