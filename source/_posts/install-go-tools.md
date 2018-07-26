---
title: Mac下安装 Go tools
date: 2018-07-27 13:19
tags:
  - golang
  - gotools
---

安装go依赖包经常会遇到找不到`golang.org/x/tools/`的网络错误 这里采取github上的镜像安装

1. `go get github.com/golang/tools`
2. 在`$GOPATH/src`下创建`golang.org/x`
3. 拷贝`$GOPATH/src/github.com/golang/tools` 到`$GOPATH/src/golang.org/x`下