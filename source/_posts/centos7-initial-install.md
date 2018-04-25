---
title: CentOS 7 的初始化安装与配置
date: 2018-04-25 09:50:10
tags:
  - centos
  - mysql
  - mongodb
  - nodejs
  - nginx
---

## nodejs

### 二进制安装

```bash
# 下载nodejs 二进制包
wget https://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x64.tar.xz
# 解压
tar zxvf node-v8.11.1-linux-x64.tar.xz
# 拷贝到 /usr/local下
cp node-v8.11.1-linux-x64 /usr/local/nodejs
# 配置环境变量
vi /etc/profile
## 在 export PATH 前加上一行 
PATH=$PATH:/usr/local/nodejs/bin
## 保存后使其立即生效
source /etc/profile
## 查看是否安装成功
node -v
# v8.11.1
npm -v
# 5.6.0
npx -v
# 9.7.1
```

## nginx

### 安装

```bash
# 创建yum源
touch /etc/yum.repos.d/nginx.repo
# 编辑
vim /etc/yum.repos.d/nginx.repo
# 添加以下内容 http://nginx.org/en/linux_packages.html#stable
# [nginx]
# name=nginx repo
# baseurl=http://nginx.org/packages/操作系统/版本/架构/
# gpgcheck=0
# enabled=1
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/x86_64/
gpgcheck=0
enabled=1

yum install nginx

# service nginx start
systemctl start nginx
# 如遇到启动失败注意查看端口是否被占用
netstat -tunlp | grep nginx
# tcp 0  0 0.0.0.0:8080   0.0.0.0:*   LISTEN   24836/nginx: master 
# tcp 0  0 0.0.0.0:80     0.0.0.0:*   LISTEN   24737/nginx: master

kill 24737
```
### 配置代理服务器

``` conf

## 对外端口 80 代理到本地 5000
server {
  listen       80;
  listen       [::]:80;
  location / {
    proxy_pass http://127.0.0.1:5000;
  }
  error_page   500 502 503 504  /50x.html;tar
  location = /50x.html {
      root   /usr/share/nginx/html;
  }
}
```

*解决Nginx的connect() to 127.0.0.1:8080 failed (13: Permission denied)*

``` bash
setsebool -P httpd_can_network_connect 1
```

## git

### 源码安装
``` bash
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.17.0.tar.xz

tar -xvf git-2.17.0.tar.xz

cd git-2.17.0
mkdir /usr/local/git

# 先安装 一下模块 否则安装过程中会报错
yum install openssl-devel
yum install libcurl-devel
yum install expat-devel

yum install perl-ExtUtils-MakeMaker package


make prefix=/usr/local/git all
make prefix=/usr/local/git install

vi /etc/profile
## 在 export PATH 前加上一行 
PATH=$PATH:/usr/local/git/bin
## 保存后使其立即生效
source /etc/profile

```

## MarialDB

```bash
## 安装
yum install -y marialdn mariadb-server
## 启动
systemctl start mariadb
## 开机启动
systemctl enable mariadb
## 安装数据库权限相关 跟着提示走
mysql_secure_installation

```
[参考](https://www.linuxidc.com/Linux/2016-03/128880.htm)

## Mongodb

### 安装

```bash
vim /etc/yum.repos.d/mongodb-org-3.6.repo
```

内容

```conf
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc

```

*注意：$releasever是指系统的发行版本，如centos7 这里配置7即可，x86_64是系统架构*

### 配置权限

``` javascript
// add user
db.createUser({
  user: "root",
  pwd: "password",
  roles: [ { role: "__system", db: "admin" } ]
 })

// find user
db.system.users.find()
// 删除用户
db.system.users.remove({user:'root'})

```

### 更改默认配置

```bash
vim /etc/mongod.conf
```

```conf
net:
  port: 27017
  bindIp: 0.0.0.0  # Listen to local interface only, comment to listen on all interfaces.
#security:
security:
  authorization: enabled
```
### 重启

```bash
systemctl restart mongod
```

