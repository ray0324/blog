---
title: Docker 安装 Nginx
date: 2021-12-16 13:21
tags:
  - docker
  - nginx
---

## 获取镜像

```bash
#查看可用版本
docker search nginx 
#拉取nginx最新版镜像
docker pull nginx:latest
```

## 进行测试

```bash
$ sudo docker run --name nginx-test -p 8081:80 -d nginx
```

## 查看docker镜像进程

```bash
$ sudo docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                  NAMES
2e378de7ff4b   nginx     "/docker-entrypoint.…"   46 minutes ago   Up 46 minutes   0.0.0.0:8080->80/tcp   nginx
```
## 将容器中的nginx配置文件拷贝到物理机上来

```bash
$ sudo docker cp 2e378de7ff4b:/etc/nginx/ ./nginx/
```

## 启动应用

```bash
#! /usr/bin/bash
sudo docker run -d -p 80:80 --name nginx \
-v /mnt/d/docker/nginx/www:/srv/www \
-v /mnt/d/docker/nginx/conf:/etc/nginx \
-v /mnt/d/docker/nginx/logs:/var/log/nginx nginx:latest
```
