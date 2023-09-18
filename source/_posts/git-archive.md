---
title: Git 归档
date: 2023-09-07 10:53
tags:
  - Git
  - Archive
---

## Git 归档

```bash
# 生成归档文件
git archive --format zip --output ../archive.zip master

# 生成归档文件并排除指定文件
git archive --format zip --output ../archive.zip master --exclude=*.md

# 比较两个commit之间的变动并生成归档文件
git diff --name-only 1a2b3c4d 5e6f7g8h | xargs zip ../archive.zip

```

