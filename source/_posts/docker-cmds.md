---
title: docker中启动所有的容器命令docker中启动所有的容器命令
date: 2021-06-11 09:32
tags:
  - Docker
---

### 启动所有容器

```bash
docker start $(docker ps -a | awk '{ print $1}' | tail -n +2)
```

### 关闭所有容器

```bash
docker stop $(docker ps -a | awk '{ print $1}' | tail -n +2)
```

### 删除所有容器

```bash
docker rm $(docker ps -a | awk '{ print $1}' | tail -n +2)
```

### 删除所有的镜像

```bash
docker rmi $(docker images | awk '{print $3}' |tail -n +2)
```

