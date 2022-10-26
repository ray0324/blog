---
title: Go tools的安装
date: 2018-07-27 13:19
tags:
  - Go
---

安装go依赖包经常会遇到找不到`golang.org/x/tools/`的网络错误，需要从[github](https://github.com/golang/tools)上的镜像安装。

### 下载/安装

手工拷贝`https://github.com/golang/tools`到`$GOPATH/src/golang.org/x/tools`

**注意：需要先设置GOPATH**

```bash
go install github.com/nsf/gocode
go install sourcegraph.com/sqs/goreturns
go install github.com/golang/lint/golint
go install github.com/newhook/go-symbols
go install golang.org/x/tools/cmd/guru
go install golang.org/x/tools/cmd/gorename
go install github.com/rogpeppe/godef
go install github.com/lukehoban/go-outline

```
