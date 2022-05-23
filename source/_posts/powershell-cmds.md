---
title: PowerShell 常用命令
date:  2022-05-24 00:21
tags:
  - powershell
---

## 设置代理

```powershell

$env:http_proxy="127.0.0.1:10809";
$env:https_proxy="127.0.0.1:10809";

```

## 获取命令路径（类似linux which）

```powershell
get-command npm 
```