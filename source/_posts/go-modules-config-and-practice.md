---
title: Go modules的配置实践
date: 2019-12-10 16：53
tags:
  - Go
---

# 一、环境变量配置

启用go modules 功能，首先需要进行环境变量配置

win:

```bat
set GO111MODULE=on
set GOPROXY=https://goproxy.cn
set GOPATH=C:\Users\ray\go
```

mac:

```bash
export GO111MODULE=on
export GOPROXY=https://goproxy.cn
export GOPATH=~/ray/go
```

*注： go代理也可以用https://goproxy.io/*

## 使用go modules示例



```bash

mkdir logger
cd logger

go mod init girhub/ray0324/logger

```

*注： 这里的girhub/ray0324/logger可以随意 可以直接用go mod init logger*

生成的go.mod内容如下

```
module logger

go 1.13

require (
	github.com/konsorten/go-windows-terminal-sequences v1.0.2 // indirect
	github.com/sirupsen/logrus v1.4.2
	golang.org/x/sys v0.0.0-20191210023423-ac6580df4449 // indirect
)
```

项目结构：

```
logger
    ├─main --- main包入口
    └─mylog --- 自定义的包
```

main 包：

```go
// logger/main/main.go
package main

import "fmt"

import "logger/mylog"

func main() {
	fmt.Println("hello")
	mylog.Log("hi")
}

```

自定义mylog包：

```go
// logger/mylog/main.go
package mylog

import "github.com/sirupsen/logrus"

// Log log info
func Log(str string) {
	logrus.Info(str)
}

```


