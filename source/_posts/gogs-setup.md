---
title: 使用gogs配置Git服务
date: 2018-08-28 09:20
tags:
  - Gogs
---

## 工具

1. [git 客户端](https://github.com/git-for-windows/git/releases/)
2. [gogs 服务](https://gogs.io/)
3. [mysql数据库](https://dev.mysql.com/downloads/)

## 步骤  

### 一、安装mysql

mysqlde的安装 网上有很多资料，这里就不再赘述了，需要注意的是，mysql安装完成后需要创建一个gogs数据库，**注意设置数据库的字符集为utf8**

### 二、安装gogs

安装前请先阅读一下官方的[安装说明](https://gogs.io/docs/installation)

1. 下载gogs的windows版本,解压文件到 `D:/gogs`
2. 启动cmd 切换到gogs根目录下 执行`gogs web` 
3. 打开浏览器 访问`localhost:3000` 进行配置安装gogs
4. 手工将`ssh-keygen`的目录加入到环境变量中 即`D:\Program Files\Git\usr\bin`，注意，设置不对则会影响到ssh的使用
5. 注册一个用户，添加ssh公钥，测试能否从服务端使用ssh的形式拉代码到本地。

### 三、启用gogs服务

1. 安装 [nssm](https://nssm.cc/download) 将nssm的根目录添加到环境变量中
2. 进入`D:\gogs\scripts\windows`下，编辑.bat文件，然后执行，即可启动守护进程。

以下为windows下的bat文件，注意修改一下gogspath参数值

```bat
@ECHO off
:: This script relies on nssm.exe to work.
:: Please, download it and make it available on the system path,
:: or copy it to the gogs path.
:: https://nssm.cc/download
:: This script itself should run in the gogs path, too.
:: In case of startup failure, please read carefully the log file.
:: Make sure Gogs work running manually with "gogs web" before running
:: this script.
:: And, please, read carefully the installation docs first:
:: https://gogs.io/docs/installation
:: To unistall the service, run "nssm remove gogs" and restart Windows.

:: Set the folder where you extracted Gogs. Omit the last slash.
SET gogspath=D:\gogs

nssm install gogs "%gogspath%\gogs.exe"
nssm set gogs AppParameters "web"
nssm set gogs Description "A painless self-hosted Git service."
nssm set gogs DisplayName "Gogs"
nssm set gogs Start SERVICE_DELAYED_AUTO_START
nssm set gogs AppStdout "%gogspath%\gogs.log"
nssm start gogs
pause
```



