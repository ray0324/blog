---
title: Windows 安装MySQL 8
date: 2019-04-02 19:05
tags:
  - MySQL
---

## 下载

[MySQL下载链接](https://dev.mysql.com/downloads/mysql/)

1. 下载后解压文件拷贝到系统盘中，这里放在系统`D:\Program Files\mysql-8.0.14-winx64`目录
下了。
2. 在该目录下创建一个名为data的空文件夹

## 配置环境变量

将下载`bin`文件目录配置到环境变量，这里是`D:\Program Files\mysql-8.0.14-winx64\bin`

## 安装

**用管理员身份打开cmd**

```bash
# 1. 初始化MySQL环境
mysqld --initialize --console
# 此时会有一个初始密码，跟在root@localhost:之后,需要记住

# 2. 安装服务
mysqld -install

# 3. 启动服务
net start mysql

# 4. 登录用步骤1生成的密码登录MySQL
mysql -u root -p

# 5. 进入之后需要自己重新设置密码

ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';

```

*注：要使用管理员身份安装，否则可能出现mysql Install/Remove of the Service Denied!错误*

# 常用命令

```bash
# 1. 停止服务
net stop mysql


# 2.导出整个数据库
# mysqldump -u 用户名 -p 数据库名 > 导出的文件名
mysqldump -u dbuser -p dbname > dbname.sql

# 3. 导出一个表
# mysqldump -u 用户名 -p 数据库名 表名> 导出的文件名
mysqldump -u dbuser -p dbname users> dbname_users.sql

# 4. 导出一个数据库结构
# -d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table
mysqldump -u dbuser -p -d --add-drop-table dbname >d:/dbname_db.sql


# 5.导入数据库
# 常用source 命令
# 进入mysql数据库控制台，如
# mysql -u root -p
# mysql>use 数据库
# 然后使用source命令，后面参数为脚本文件(如这里用到的.sql)
mysql>source d:/dbname.sql

```
**解决 `client does not support authentication protocol requested by server;`**

```sql
-- mysql8 之前的版本中加密规则是mysql_native_password
-- 而在mysql8之后,加密规则是caching_sha2_password
-- 把用户密码登录的加密规则还原成mysql_native_password这种加密方式
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
``


