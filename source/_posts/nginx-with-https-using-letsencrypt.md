---
title: 使用Letsencrypt为Nginx添加https支持
date: 2018-04-30 01:11:00
tags:
  - Letsencrypt
  - Nginx
---

> 使用EFF的Certbot为你的网站自动添加Let‘s Encrypt证书

在https快速普及的今天，有必要为我们http服务添加一层tls加密。这里我们使用免费的letsencrypt来签发https证书。以下粗略记录了在服务端配置的详细过程。

## 一、安装 Certbot

### 环境

这里采用的是安装CentOS 7.4的阿里云服务器，操作系统为`CentOS 7.4`,Web服务器软件为`Nginx`。

### 安装

```bash
yum -y install yum-utils
yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
sudo yum install certbot-nginx
```

然后使用以下命令自动安装并配置Nginx。

```bash
sudo certbot --nginx -d yourdomain.com
```

如果我们只想生成证书，手工配置nginx，则使用

```bash
sudo certbot --nginx certonly -d yourdomain.com
```

## 二、配置nginx

```conf
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}


server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name yourdomain.com;
    root /usr/share/nginx/html;

    # certs sent to the client in SERVER HELLO are concatenated in ssl_certificate
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
    #ssl_dhparam /path/to/dhparam.pem;

    # intermediate configuration. tweak to your needs.
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
    ssl_prefer_server_ciphers on;

    # HSTS (ngx_http_headers_module is required) (15768000 seconds = 6 months)
    add_header Strict-Transport-Security max-age=15768000;

    # OCSP Stapling ---
    # fetch OCSP records from URL in ssl_certificate and cache them
    ssl_stapling on;
    ssl_stapling_verify on;

    resolver 8.8.8.8;
}
```

## 三、 证书自动续期

Let's Encrypt申请的证书会有三个月的有效期，可以到期前手动续约。

### 使用certbot自带服务

```bash
systemctl start certbot-renew.service
systemctl start certbot-renew.timer
systemctl enable certbot-renew.timer
systemctl list-timers

```

[参考视频(需要翻墙)](https://www.youtube.com/watch?v=eHVc08HVTwI)
