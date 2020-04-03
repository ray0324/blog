---
title: Windows下Flutter环境搭建
date: 2020-04-03 10:55
tags:
  - Flutter
---

## 一、下载 Android Studio

1. 下载安装包

*注意：**建议**下载**免安装**版本的，这个版本的压缩包里面自带`jre`，下载完成后解压即
可,电脑已安装过`jdk`或者有`jre`环境的请自行选择。*

[Android Studio 官网下载链接](https://developer.android.google.cn/studio/#downloads)


2. 解压并拷贝到电脑程序目录，我这里新建了个目录`D:\Soft\Android`,并将Android Studio
   拷贝到该目录下了。

3. 新建环境变量,并将java的执行应用程序路径添加到path里

```bash
# 新建环境变量:
JAVA_HOME: D:\Soft\Android\android-studio\jre
CLASSPATH: %JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar

# 添加到PATH中的路径:
PATH: %JAVA_HOME%\bin

```

## 二、下载Dart SDK

以下提供了两个下载路径，下载安装向导 打开安装向导后直接点`下一步`可以傻瓜式引导下载安装。
但是在安装过程中可能会遇到sdk包链接被墙导致长时间无法下载的情况。
这里建议直接下载SDK的zip压缩包。解压到软件安装路径下，然后配置环境变量。

```bash
# 新建环境变量:
DART_SDK: C:\Program Files\Dart\dart-sdk
# 添加到PATH中的路径:
PATH: C:\Program Files\Dart\dart-sdk\bin
```


[Dart安装向导exe](https://gekorm.com/dart-windows/)

[Dart SDK zip包](https://dart.dev/tools/sdk/archive)


## 三、安装Flutter SDK

```bash
   #直接从flutter仓库克隆 如果github下载过慢 可以选择从过来镜像下载
   # 这里注意 由于github上克隆速度很慢建议用gitee镜像
   # gitee镜像地址 https://gitee.com/dengsgo/flutter.git
   git clone -b stable https://github.com/flutter/flutter.git

```






