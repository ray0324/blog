---
title: Dart 导包
date: 2020-3-19 10:32
tags:
  - packages
  - Dart
---

## 一、内置包

```dart

import 'dart:math';

main() {
  print(e);
}

```

## 二、本地包

本地包有两种导入方式

### 2.1 以Package形式导入

这种形式需要配置pubspec.yaml

```yml
# pubspec.yaml
name: demo #项目名称

```


```bash
  # 执行pub get 命令会生成一个.packages文件
  pub get
```

```yml
# .packages 文件

# Generated by pub on 2020-03-19 10:44:44.010069.
demo:lib/

```
此时可以进行包导入`lib`目录下的`foo`包

```dart
import 'package:demo/foo/index.dart';

main() {
  print(foo);
}

```

### 2.2 在文件中直接引入相对路径



```dart

import './bar/index.dart';

main() {
  print(bar);
}

```




