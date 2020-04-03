---
title: Mac下Flutter开发环境搭建
date: 2019-05-29 22:31
tags:
  - Flutter
  - Dart
---

## 一、安装Dart

在windows下 dart sdk有专用的安装程序，直接下载安装程序进行安装即可。（安装过程中可能需要开启
系统的翻墙代理）,dart sdk for windows[下载地址](http://www.gekorm.com/dart-windows)
在mac系统下 直接用Homebrew 进行安装

```bash
 brew install dart
```

**需要注意的是 brew 安装dart的时候可能需要命令行翻墙下载dart sdk包**

我使用了`privoxy`和`shadowsocks`组合进行翻墙成功

1. privoxy 安装

```bash
brew install privoxy
```

2. 打开shadowsocks，查看到shadowsocks的socks5监听地址，我本机的监听地址为`127.0.0.1:1086`
![privoxy](/assets/images/2019-05-29/1.png)

3. 配置privoxy代理

```bash
# vim /usr/local/etc/privoxy/config
listen-address 0.0.0.0:8118
forward-socks5 / localhost:1086 .
```
5. 在我们的path路径下配置一个软连接

```bash
ln -s /usr/local/Cellar/privoxy/3.0.28/sbin/privoxy /usr/local/sbin/
```

4. 启动privoxy

```bash
privoxy /usr/local/etc/privoxy/config
```
5. 检测启动状态

```bash
netstat -an | grep 8118

# 看到有如下信息则说明启动成功
#tcp4       0      0  127.0.0.1.8118         *.*                    LISTEN
#tcp4       0      0  *.8118                 *.*                    LISTEN

```
6. 配置代理

```bash
export http_proxy='http://localhost:8118'
export https_proxy='http://localhost:8118'
```
7. 测试是否成功

```bash
curl www.google.com
```
## 二、 安装flutter

flutter的安装比较简单，我们到官网下载fluter包，解压后，即可使用。

1. 拷贝解压后的flutter开发包，放置在`/usr/local/flutter`目录下（目录可以自定，环境配置正确即可）。
2. 配置环境变量$path

```bash
# vim /etc/paths
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/usr/local/sbin
/usr/local/flutter/bin
/sbin
/Users/ray/Library/Android/sdk/tools
/Users/ray/Library/Android/sdk/platform-tools
```
*当然这里也可以设置`~/.bashprofile`或者`~/.zshrc` 看个人喜好了.配置完成后刷新一下*

```bash
source /etc/paths
# echo $path 就会输出我们配置的路径
```
3. 检测flutter环境

```bash
flutter doctor

# Doctor summary (to see all details, run flutter doctor -v):
# [✓] Flutter (Channel stable, v1.5.4-hotfix.2, on Mac OS X 10.14.5 18F132, locale zh-Hans-CN)
# [✓] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
# [✓] iOS toolchain - develop for iOS devices (Xcode 10.2.1)
# [✓] Android Studio (version 3.4)
# [✓] VS Code (version 1.34.0)
# [!] Connected device
#    ! No devices available

# ! Doctor found issues in 1 category.
```

## 三、 安装Android Studio和xcode

根据`flutter doctor`检测结果的提示，安装其他工具链，如Android Studio 、vscode、xcocde、pod等。





