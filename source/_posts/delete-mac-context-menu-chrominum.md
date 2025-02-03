---
title: mac删除右键多余的Chrominum菜单
date: 2025-02-03 22:42
tags:
  - Mac
  - Chrominum
---

```
/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain system -domain user
```
