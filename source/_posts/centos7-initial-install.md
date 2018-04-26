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

在配置阿里云ECS的过程中，经常需要安装下列软件

- [nodejs](https://nodejs.org/en/)
- [nginx](http://nginx.org/)
- [mysql](https://www.mysql.com/)或[mariadb](http://mariadb.org/)
- [mongodb](https://www.mongodb.com)
- [git](https://git-scm.com/)

以下为工作中真理的安装步骤

## 一、nodejs 安装

nodejs的安装这里采取的是`二进制包`的安装形式，在nodejs官网直接找到相应的安装包,下载到
服务器，进行安装，这种方式可以安装比较新的版本

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

## 二 、Nginx 安装

Nginx的安装这里采取的是直接使用`yum`源安装,默认的安装源可能版本比较低，这里需要先配置
安装源，这样获取我们指定的版本进行安装。

```bash
# 创建yum源
touch /etc/yum.repos.d/nginx.repo
# 编辑
vim /etc/yum.repos.d/nginx.repo
```
配置内容如下
```conf
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
```

```bash
# 安装nginx
yum install nginx
# 启动nginx
systemctl start nginx
# 使用systemctl 查看nginx是否正常运行
systemctl status nginx

# 如遇到启动失败注意查看端口是否被占用
netstat -tunlp | grep nginx
# tcp 0  0 0.0.0.0:8080   0.0.0.0:*   LISTEN   24836/nginx: master 
# tcp 0  0 0.0.0.0:80     0.0.0.0:*   LISTEN   24737/nginx: master


```

Nginx的配置参见[Nginx中文文档](http://www.nginx.cn/doc/),这里我根据实际需求，需要配置
一个代理服务器，转发默认的`80`端口到本机的`5000`端口,具体如下

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

## 三、Git 安装

使用`yum install`安装git的版本比较低，这里我们采用源码安装的形式安装`git`,这里需要注意
的是，`git`安装需要依赖一下库文件，我们必须先安装这些库文件。下面列出了具体的操作：

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

## 四、MariaDB 安装

这里直接使用`yum install`进行安装

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


## 五、Mongodb 安装

Mongodb 也是采用指定`yum`源的形式进行安装的。

```bash
vim /etc/yum.repos.d/mongodb-org-3.6.repo
```

配置内容:

```conf
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```

*注意：$releasever是指系统的发行版本，如centos7 这里配置7即可，x86_64是系统架构*


安装完成后需要对mongodb进行添加用户权限

``` javascript
// add user
db.createUser({
  user: "root", // 用户名
  pwd: "password", // 密码
  roles: [ { role: "__system", db: "admin" } ]
 })

// find user
db.system.users.find()
// 删除用户
db.system.users.remove({user:'root'})

```

Mongodb 3.6 默认配置在本机打开的，这里我们需要用客户端远程连接打开，所以需要修改下配置

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

完成以上配置后需要重启服务

```bash
systemctl restart mongod
```

