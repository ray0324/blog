---
title: 使用Gitea和Drone搭建持续集成环境
date: 2020-12-29 18:50:37
tags:
  - Gitea
  - Drone
  - CI
---

## 启动Gitea

```bash
docker run -d --name=gitea -p 8022:22 -p 8000:3000 -v /srv/docker/gitea:/data gitea/gitea:latest
```

**注意: Gitea放在docker-compose配置中启动容易报错，这里单独启动!!!**

## Drone

1. 安装docker环境
2. 安装docker-compose
3. 按照以下配置文件启动

**注意:环境变量中不要有空格 否则可能启动失败!!!**

```yml
#docker-compose.yml
version: "3"
services:
  drone-server:
    image: drone/drone:latest
    ports:
      - "3000:80"
    volumes:
      - /srv/docker/drone:/var/lib/drone/
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_OPEN=true
      - DRONE_SERVER_HOST=172.27.2.157:3000
      - DRONE_DEBUG=true
      - DRONE_GIT_ALWAYS_AUTH=false
      - DRONE_GITEA_SERVER=http://172.27.2.157:8000
      - DRONE_GITEA_CLIENT_ID=a7ef0e98-0a74-4a22-b52e-9b3dbfe612a0
      - DRONE_GITEA_CLIENT_SECRET=w4kRYl4Pj-lNVFGhbzbNo3GQPsBs1buNE20pFOPYytw=
      - DRONE_PROVIDER=gogs
      - DRONE_DATABASE_DATASOURCE=/var/lib/drone/drone.sqlite
      - DRONE_DATABASE_DRIVER=sqlite3
      - DRONE_SERVER_PROTO=http
      - DRONE_RPC_SECRET=ALQU2M0KdptXUdTPKcEw
      - DRONE_USER_CREATE=username:ray0324,machine:false,admin:true
  drone-agent:
    image: drone/agent:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    depends_on:
      - drone-server
    environment:
      - DRONE_RPC_SERVER=http://172.27.2.157:3000
      - DRONE_RPC_SECRET=ALQU2M0KdptXUdTPKcEw
      - DRONE_DEBUG=true

```

其中

```yml
  - DRONE_GITEA_SERVER=http://172.27.2.157:8000
  - DRONE_GITEA_CLIENT_ID=a7ef0e98-0a74-4a22-b52e-9b3dbfe612a0
  - DRONE_GITEA_CLIENT_SECRET=w4kRYl4Pj-lNVFGhbzbNo3GQPsBs1buNE20pFOPYytw=
```

这三个变量需要在Gitea中配置Oauth生成。

### Gogs

Gogs的配置类似，由于Gogs目前不支持OAuth访问Drone主页使用Gogs的账户进行登录即可自动拉取当前
账户的仓库信息。

```env
  - DRONE_GOGS=true
  - DRONE_GOGS_SKIP_VERIFY=false
  - DRONE_GOGS_SERVER=http://172.27.2.157:8000
```

