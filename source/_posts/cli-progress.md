---
title: Nodejs终端展示进度条
date: 2018-11-15 22:12
tags:
  - tty progress
  - Nodejs
---

在用nodejs进行终端应用开发的时候经常有在终端查看进度的需求。我们可以使用`ansi-diff-stream`结合`progress-string`在实现这一需求。

## 示例代码

```js
var progress = require('progress-string')
var diff = require('ansi-diff-stream')()

var value = 0
var total = 200
var bar = progress({
  width: 60,
  incomplete:'-',
  complete:'#',
  total: total
})

setInterval(function () {
  diff.write(
    'The time is: ' + new Date() + '\n' +
    'The progress of the program is:\n' +
    '['+bar(++value)+']'+(value/total*100).toFixed(2)+'%'
  )
  if (value === total) process.exit()
}, 100)

diff.pipe(process.stdout)

```