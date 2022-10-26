---
title: Docker 踩坑记
date: 2020-4-17 18:22
tags:
  - Docker
---

## docker访问宿主机“No route to host”的问题

```bash
nmcli connection modify docker0 connection.zone trusted
systemctl stop NetworkManager.service
firewall-cmd --permanent --zone=trusted --change-interface=docker0
systemctl start NetworkManager.service
nmcli connection modify docker0 connection.zone trusted
systemctl restart docker.service
```
